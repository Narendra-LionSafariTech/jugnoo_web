const express = require('express')
const session = require('express-session');
const dotenv = require("dotenv")
const cors = require("cors")
const cron = require('node-cron');
const http = require('http');
const path = require('path');
dotenv.config();
const index = require('./routes/index');
const app = express()
const cookieParser = require('cookie-parser');
const { setupSocket } = require('./socket');
const db = require('./config/db');
const server = http.createServer(app);

app.use(cookieParser());
app.set('trust proxy', true);

app.use(cors())

app.use(
  session({
    secret: 'WSDMKDWK274YXMIWJRW83MMIQMNUR32MUEHEJ',
    resave: false,
    saveUninitialized: false,

  })
);
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/v1', index);


const buildPath = path.join(__dirname, './client', 'dist')
app.use(express.static(buildPath))
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'dist', "index.html"));
});



// setInterval(async () => {
//   try {
//     const response = await axios.get(
//       `https://newsapi.org/v2/top-headlines?category=sports&country=in&apiKey=${NEWS_API_KEY}`
//     );
//     socket.emit("newsUpdate", response.data.articles);
//   } catch (err) {
//     console.error("News fetch error:", err.message);
//   }
// }, 5 * 60000);

// // Send cricket scores every 30s
// setInterval(async () => {
//   try {
//     const response = await axios.get(
//       `https://api.cricapi.com/v1/currentMatches?apikey=${CRICKET_API_KEY}&offset=0`
//     );
//     socket.emit("cricketUpdate", response.data.data);
//   } catch (err) {
//     console.error("Cricket fetch error:", err.message);
//   }
// }, 60000);

setupSocket(server);
const PORT = process.env.PORT || 8000
server.listen(PORT, () => {
  console.log(`server is running at port no ${PORT}`);
})