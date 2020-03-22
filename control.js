const { vJoy, vJoyDevice } = require('vjoy');
const steerMin = -1.0;
const steerMax = 1.0;
const minMoveSpeed = 25;
const control = {
  lastMove: Date.now(),
};
if (!vJoy.isEnabled()) {
  console.error('vJoy is not enabled.');
  process.exit();
}

function normalizeJoystickInput (value) {
  return Math.round(32767.0 / 2 * (1 + value));
}

const device = vJoyDevice.create(1);
control.steer = function (steering) {
  if (steering >= steerMin && steering <= steerMax) {
    device.axes.X.set(normalizeJoystickInput(steering));
  }
};

control.move = function (speed) {
  control.lastMove = Date.now();
  // TODO make this realistic
  if (speed > minMoveSpeed) {
    device.buttons[1].set(true); // Press A button on controller
    console.log('move');
  } else {
    device.buttons[1].set(false);
    console.log('break');
  }
  // When idle
  setTimeout(function () {
    if (Date.now() - control.lastMove >= 3000) {
      device.buttons[1].set(false);
      console.log('idle break');
    }
  }, 3000);
};

module.exports = control;
