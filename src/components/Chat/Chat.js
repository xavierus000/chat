const socket = io("https://fast-spire-11802.herokuapp.com/:3111");

export default {
  name: 'Chat',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      dados: {
        usuarioLogado: '',
        mensagemDigitada: ''
      },
      mensagens: []
    }
  },
  methods: {
    enviarMensagem: function () {
        if(this.dados.mensagemDigitada != ''){
            socket.emit("newMessage", this.dados)
            this.dados.mensagemDigitada = ''
        }
    },
    conectar: function () {
        if(this.dados.usuarioLogado != ''){
        socket.emit("newUser", this.dados.usuarioLogado)
        $(".identificacao-div").fadeOut("slow")
        }
    }
  },
  created: function () {
    socket.on('newUser', function (user) {
      console.log(user);
      $("#chat-wrapper").append("<div class='row'><div class='col s12 center-align'>O usuário " + user + " se conectou</div></div>")
    });
    socket.on('newMessage', ((dados) => {
      this.mensagens.push(dados)
      console.log(dados)
      $("html").animate({
        scrollTop: $("#chat-wrapper").height()
      }, "slow")
    }))
  }
}
