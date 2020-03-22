let os = require('os');

module.exports.localIpAddress = () => {
  let ifaces = os.networkInterfaces();
  for (let dev in ifaces) {
    for (let detail of ifaces[dev]) {
      if (detail.family === 'IPv4') {
        return detail.address;
      }
    }
  }
  return undefined;
};
