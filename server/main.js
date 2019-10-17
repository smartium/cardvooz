import { Meteor } from 'meteor/meteor';

import '../imports/collections';
const dgram = require("dgram");
const oscmsg = require("osc-msg");

const SEND_PORT = 7000;
const SEND_IP = '10.10.15.3';

Meteor.startup(() => {
  // code to run on server at startup
});

Meteor.methods({
  sendOsc(_message) {
    const message = {
      address: _message,
      args: [
        { type: "integer", value: 1 }
      ]
    };
    const buffer = oscmsg.encode(message);
    const socket = dgram.createSocket("udp4");
    socket.send(buffer, 0, buffer.length, SEND_PORT, SEND_IP);
    console.log(`Mensagem OSC "${message.address}" enviada para o IP ${SEND_IP} na porta ${SEND_PORT}`);
  },

  cadastrar(nome) {
    Cadastros.insert({
      timestamp: new Date().valueOf(),
      name: nome
    });
  }
});
