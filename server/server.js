var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.render('/dist/index.html');
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

http.listen(3111, function () {
  console.log('listening on *:3111');
});
