const WebSocket = require('ws');
const control = require('./control');
const sensors = require('./sensors');

const wss = new WebSocket.Server({
  port: 8088,
  perMessageDeflate: {
    zlibDeflateOptions: {
      // See zlib defaults.
      chunkSize: 1024,
      memLevel: 7,
      level: 3,
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024,
    },
    // Other options settable:
    clientNoContextTakeover: true, // Defaults to negotiated value.
    serverNoContextTakeover: true, // Defaults to negotiated value.
    serverMaxWindowBits: 10, // Defaults to negotiated value.
    // Below options specified as default values.
    concurrencyLimit: 10, // Limits zlib concurrency for perf.
    threshold: 1024, // Size (in bytes) below which messages
    // should not be compressed.
  },
});

wss.on('connection', function connection (ws) {
  ws.on('message', function incoming (message) {
    console.log('received: %s', message);
    message = JSON.parse(message);
    if (message.type !== undefined) {
      if (message.type === 'user' && message.user !== undefined) {
        // User data e.g. weight, age and wheel circumference
        sensors.wheelCircumference = message.user.wheelCircumference;
        sensors.addSensorsListener(function (data) {
          if (data.type === 'speed') { // Move from speed
            control.move(data.value);
          }
          // Send data to app.
          ws.send(JSON.stringify(data));
        });
        sensors.start();
      } else if (message.type === 'steering') {
        control.steer(message.value);
      }
    } else {
      console.error('Not supported message:', message);
    }
  });
});
