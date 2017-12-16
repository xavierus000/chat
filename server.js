const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/dist/static'));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

io.on('connection', function (socket) {

  console.log('a user connected');

  socket.on('newMessage', function (msg) {
    var data = new Date();
    var hora = data.getHours() + ":" + data.getMinutes();
    var dados = {
      msg,
      hora
    }
    io.emit('newMessage', dados)
    console.log(dados)
  });

  socket.on('newUser', function (user) {
    io.emit('newUser', user)
    console.log(user)
  });
});

http.listen(process.env.PORT || 3111)