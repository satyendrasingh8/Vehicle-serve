const express = require('express');
const http = require('http');
const app = express();
const path = require('path')
const socketio = require('socket.io');
const Filter = require('bad-words')

const publicDirectoryPath = path.join(__dirname,'../public')
const server = http.createServer(app)
const io = socketio(server);

app.use(express.static(publicDirectoryPath))


io.on('connection',(socket)=>{
    console.log('new connection is ready')
    socket.emit('message',"Welcome")
    socket.broadcast.emit('message',"A new user has joined!")
  
    socket.on('sendMessage',(message,callback)=>{
        const filter = new Filter()
        if(filter.isProfane(message))
        {
            return callback("profanity is not allowed")
        }
        io.emit('message',message)
        callback();
    })
socket.on('disconnect',()=>{
    io.emit('message',"A user has left")
})
socket.on('shareLocation',(coords,callback)=>{
    
    io.emit('locationMessage',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`)
    callback();
})

})

const port = process.env.PORT || 3000 ;



server.listen(port,()=> {
    console.log('server is up running up on port :',port)
})
