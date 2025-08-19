const { Server } = require("socket.io");
const Chat = require("../models/chatRoom");
const Message = require('../models/message');
const User = require('./models/user');

const { markUserOnline } = require("./middlewares/activityTracker")
const onlineUsers = new Map();

const setupSocket = async (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  global._io = io;

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);
    socket.on("join_room", (contactId) => {
      socket.join(contactId);
      console.log(`Socket ${socket.id} joined room: ${contactId}`);
    });

    socket.on("get_user_chats", async (userId, callback) => {
      try {
        const user = await User.findById(userId)
          .populate('matches.user', 'fullName profilePhotos')
          .lean();

        if (!user || !user.matches?.length) {
          return callback({ status: 'ok', data: [] });
        }

        const matchedUserIds = user.matches.map(match => match.user?._id?.toString()).filter(Boolean);

        const chats = await Chat.find({
          participants: { $in: [userId] }
        }).lean();

        const chatMap = new Map();

        for (const chat of chats) {
          const otherParticipant = chat.participants.find(p => p.toString() !== userId);
          if (otherParticipant) {
            chatMap.set(otherParticipant.toString(), chat);
          }
        }


        const sidebarData = user.matches.map(match => {
          const matchedUser = match.user;
          const matchedUserId = matchedUser?._id?.toString();
          const chat = chatMap.get(matchedUserId);
          // console.log("matchedUser",matchedUser)

          const unseen = chat?.unseenCount?.find(u => u.user.toString() === userId);
          const unseenCount = unseen?.count || 0;

          return {
            userId: matchedUserId,
            fullName: matchedUser.fullName,
            profileImage: matchedUser.profilePhotos?.[0] || '',
            isOnline: onlineUsers.has(matchedUserId),
            lastMessage: chat?.lastMessage || '',
            unseenCount
          };
        });

        // console.log("sidebarData", sidebarData)
        callback({ status: 'ok', data: sidebarData });
      } catch (err) {
        console.error("get_user_chats error:", err.message);
        callback({ status: 'error', error: err.message });
      }
    });

    socket.on("mark_messages_seen", async ({ chatId, userId }) => {
      try {
        console.log("mark_messages_seen chatId", chatId)
        console.log("mark_messages_seen userId", userId)
        const chat = await Chat.findById(chatId);
        if (!chat) return;

        const message = await Message.updateMany(
          {
            chatId,
            sender: { $ne: userId },
            isSeen: false
          },
          {
            $set: { isSeen: true }
          }
        );

        console.log("message")
        // Reset unseen count for this user
        chat.unseenCount = chat.unseenCount.map(entry =>
          entry.user.toString() === userId ? { ...entry, count: 0 } : entry
        );
        await chat.save();
        global._io.to(userId).emit("update_sidebar");
        await chat.save();
      } catch (err) {
        console.error("mark_messages_seen error:", err.message);
      }
    });

    socket.on("send_message", async ({ chatId, senderId, receiverId, content, media = null, replyTo = null }, callback) => {
      try {
        let chat;
        if (!chatId) {
          chat = await Chat.findOneAndUpdate(
            { participants: { $all: [senderId, receiverId] } },
            {},
            { upsert: true, new: true, setDefaultsOnInsert: true }
          );
        } else {
          chat = await Chat.findById(chatId);
        }

        const newMessage = await Message.create({
          chatId: chat._id,
          sender: senderId,
          content,
          media,
          replyTo,
          deliveredTo: [receiverId],
        });

        const messageData = {
          _id: newMessage._id,
          chatId: chat._id,
          senderId,
          content: newMessage.content,
          media: newMessage.media,
          replyTo: newMessage.replyTo,
          timestamp: newMessage.createdAt,
        };

        chat.lastMessage = content;

        chat.unseenCount = chat.unseenCount || [];

        let updatedUnseen = chat.unseenCount.map(entry => {
          if (entry?.user && entry.user.toString() === receiverId) {
            return { ...entry, count: entry.count + 1 };
          }
          return entry;
        });

        const receiverInUnseen = chat.unseenCount.some(
          entry => entry?.user && entry.user.toString() === receiverId
        );

        if (!receiverInUnseen) {
          updatedUnseen.push({ user: receiverId, count: 1 });
        }

        chat.unseenCount = updatedUnseen;
        await chat.save();

        global._io.to(receiverId).emit("receive_message", {
          chatId: chat._id,
          senderId,
          receiverId,
          message: messageData,
        });

        global._io.to(senderId).emit("sent_message", {
          chatId: chat._id,
          senderId,
          receiverId,
          message: messageData,
        });
        // Emit updated sidebar info to both users
        const sidebarData = {
          chatId: chat._id,
          userId: senderId,
          otherUserId: receiverId,
          lastMessage: content,
          unseenCount: 0,
        };

        const receiverSidebarData = {
          chatId: chat._id,
          userId: receiverId,
          otherUserId: senderId,
          lastMessage: content,
          unseenCount:
            updatedUnseen?.find(u => u?.user?.toString() === receiverId)?.count || 1,
        };

        global._io.to(senderId).emit("update_sidebar_chat", sidebarData);
        global._io.to(receiverId).emit("update_sidebar_chat", receiverSidebarData);

        if (callback) callback({ status: "ok", chatId: chat._id });
        if (callback) callback({ status: "ok", chatId: chat._id });
      } catch (err) {
        console.error("Socket send_message error:", err.message);
        if (callback) callback({ status: "error", error: err.message });
      }
    });



    socket.on("react_to_message", async ({ messageId, userId, emoji }) => {
      try {
        const message = await Message.findById(messageId);

        // console.log("message",message)
        if (!message) return;

        // Remove existing reaction by same user if exists
        message.reactions = message.reactions.filter(
          (r) => r.user.toString() !== userId
        );

        message.reactions.push({ user: userId, emoji });

        await message.save();

        global._io.to(message.chatId.toString()).emit("message_reacted", {
          messageId,
          userId,
          emoji,
        });
      } catch (err) {
        console.error("Socket react_to_message error:", err.message);
      }
    });

    socket.on("leave_room", (contactId) => {
      socket.leave(contactId);
      console.log(`Socket ${socket.id} left room: ${contactId}`);
    });

    socket.on("register_user", async (userId) => {
      console.log('userId2', userId)
      onlineUsers.set(userId, socket.id);
      socket.join(userId);
      await markUserOnline(userId);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
        }
      }
    });

    socket.on('heartbeat', async (userId) => {
      await markUserOnline(userId);
    });

  });
}

module.exports = { setupSocket, onlineUsers };
