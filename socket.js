const { Server } = require("socket.io");
const { Chat, Message } = require("./models/chatMessage");

const onlineUsers = new Map();

const setupSocket = (server) => {
  const io = new Server(server, {
    cors: { origin: "*" },
  });

  global._io = io;

  io.on("connection", (socket) => {
    console.log("✅ User connected:", socket.id);

    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });

    socket.on("join_chat", (chatId) => {
      socket.join(chatId);
      console.log(`📌 Socket ${socket.id} joined chat: ${chatId}`);
    });

    socket.on("send_message", async (data) => {
      try {
        const { chatId, sender, content, messageType, replyTo } = data;

        const chat = await Chat.findById(chatId);
        if (!chat) {
          console.error("Chat not found:", chatId);
          return;
        }

        const receiver = chat.participants.find(
          (p) => p._id.toString() !== sender._id.toString()
        );

        const newMessage = await Message.create({
          chatId,
          sender,
          receiver,
          content,
          messageType: messageType || "text",
          replyTo,
          status: "sent",
        });

        chat.lastMessage = newMessage._id;
        await chat.save();

        io.to(chatId).emit("receive_message", newMessage);

        [sender._id, receiver._id].forEach((uid) => {
          const socketId = onlineUsers.get(uid.toString());
          if (socketId) {
            io.to(socketId).emit("chat_updated", {
              chatId,
              lastMessage: newMessage,
            });
          }
        });
      } catch (error) {
        console.error("Error sending message:", error);
      }
    });

    socket.on("react_message", async ({ messageId, userId, emoji }) => {
      try {
        const updated = await Message.findByIdAndUpdate(
          messageId,
          { $set: { reaction: { user: userId, emoji } } },
          { new: true }
        ).populate("replyTo", "content sender");
        if (updated) {
          io.to(updated.chatId.toString()).emit("message_reacted", updated);
        }
      } catch (error) {
        console.error("Error reacting to message:", error);
      }
    });

    socket.on("typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("user_typing", { chatId, userId });
    });

    socket.on("stop_typing", ({ chatId, userId }) => {
      socket.to(chatId).emit("user_stop_typing", { chatId, userId });
    });

    socket.on("mark_read", async ({ chatId, userId }) => {
      try {
        await Message.updateMany(
          { chatId, "receiver._id": userId, status: { $ne: "read" } },
          { $set: { status: "read" } }
        );
        io.to(chatId).emit("messages_read", { chatId, userId });
      } catch (error) {
        console.error(" Error marking messages read:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (let [userId, id] of onlineUsers.entries()) {
        if (id === socket.id) {
          onlineUsers.delete(userId);
          break;
        }
      }
      io.emit("online_users", Array.from(onlineUsers.keys()));
    });
  });
};

module.exports = { setupSocket };
