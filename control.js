const { vJoy, vJoyDevice } = require('vjoy');
const steerMin = -1.0;
const steerMax = 1.0;
const minMoveSpeed = 25;
const control = {
  lastMove: Date.now(),
  isBreak: false,
};
if (!vJoy.isEnabled()) {
  console.error('vJoy is not enabled.');
  process.exit();
}

function normalizeJoystickInput (value) {
  return Math.round(32767.0 / 2 * (1 + value));
}

function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const device = vJoyDevice.create(1);
control.steer = function (steering) {
  if (steering >= steerMin && steering <= steerMax) {
    device.axes.X.set(normalizeJoystickInput(steering));
  }
};

control.move = function (speed) {
  console.log(speed);
  control.lastMove = Date.now();
  // TODO make this realistic
  if (speed > minMoveSpeed) {
    device.buttons[1].set(true); // Press A button on controller
    console.log('pedal');
  } else {
    device.buttons[1].set(false);
    console.log('free');
  }
  // When idle
  setTimeout(async function () {
    if (Date.now() - control.lastMove >= 3000) {
      await control.break();
    }
  }, 5000);
};

control.break = async function () {
  if (!control.isBreak) {
    console.log('break');
    control.isBreak = true;
    device.buttons[1].set(false);
    device.axes.Z.set(normalizeJoystickInput(-1) + 1);
    await sleep(200);
    device.axes.Z.set(normalizeJoystickInput(0));
    control.isBreak = false;
  }
};

module.exports = control;
