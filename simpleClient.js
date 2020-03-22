const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8088/');

ws.on('open', function open () {
  let userDataMessage = {
    type: 'user',
    user: {
      weight: 60,
      wheelCircumference: 2.105,
    },
  };
  ws.send(JSON.stringify(userDataMessage));
});

ws.on('message', function incoming (data) {
  console.log(data);
});
