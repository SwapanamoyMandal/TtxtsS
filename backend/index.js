// server.js
const express = require("express");
const cors = require("cors")
const http = require("http");
const { Server } = require("socket.io");
require('./database')
const {router} = require('./router')
const {roomModel} = require('./schema');
require('dotenv').config()

const app = express();
app.use(cors({
  origin: process.env.URL,
  credentials:true,
}))
app.use(express.json());


const server = http.createServer(app);
const io = new Server(server, {
  cors: {
  origin: process.env.URL,
  credentials:true,
},
});


io.on("connection", (socket) => {

  socket.on("join-room", async (id) => {
    socket.join(id);
  });

  socket.on("leave-room", (id) => {
    socket.leave(id);

  });
    
  socket.on('members_count', async(id)=>{
    
      const clients = await io.in(id).fetchSockets() // returns a Set
    
      console.log(`Number of clients: ${clients.length}`);
      io.to(id).emit('numbers_of_mumbers',clients.length)
  
  })

  socket.on("send-message", ({ id, message, username}) => {
    const msgData = { username, message };
    io.to(id).emit("receive-message", msgData);
    console.log("Sent:", msgData);
  });

  socket.on('remove_members',async(id)=>{
      // your logic to remove members
      io.to(id).emit('remove_all')      
      console.log('Removing members from:', id);
  })
});

app.use('/room',router)

const port = process.env.PORT || 3001

server.listen(port, () => {
  console.log("Server running on port 3001");
});


module.exports = {io}