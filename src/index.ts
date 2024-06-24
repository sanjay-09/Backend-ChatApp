import express from "express";
import http from "http"
import { Server,Socket } from "socket.io";
import connect from "./Config/db";
import chat from "./Model/chat";
const app=express();
const server=http.createServer(app);
const io=new Server(server);
io.on("connection",(socket:Socket)=>{
    console.log(socket.id);

   socket.on("join_room",async(data)=>{
    console.log(data);
    socket.join(data.roomId);
    const chats=await chat.find({
        roomId:data.roomId
    })
    io.to(data.roomId).emit("old_chats",{
        data:chats
    })
   })
   
   socket.on("message_send",async(data)=>{
   const response=await chat.create({
    name:data.name,
    message:data.message,
    roomId:data.roomId
   })
    io.to(data.roomId).emit("message_received",data);
   })



})
server.listen(3003,async()=>{
    console.log('server is listening on the PORT 3003');
    await connect();
    console.log("connected to the db");

})


