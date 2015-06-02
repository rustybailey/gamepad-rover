var gamepad = require("gamepad");

// Initialize the library
gamepad.init();

// List the state of all currently attached devices
for (var i = 0, l = gamepad.numDevices(); i < l; i++) {
  console.log(i, gamepad.deviceAtIndex());
}

// Create a game loop and poll for events
setInterval(gamepad.processEvents, 16);
// Scan for new gamepads as a slower rate
setInterval(gamepad.detectDevices, 500);

// Listen for move events on all gamepads
gamepad.on("move", function (id, axis, value) {
  // console.log("move", {
  //   id: id,
  //   axis: axis,
  //   value: value,
  // });
  var val = value * 100;

  if (axis === 1 && (val < -10 || val > 10)) {
    console.log('Left wheel: ' + val);
  }

  if (axis === 3 && (val < -10 || val > 10)) {
    console.log('Right wheel: ' + val);
  }
});

// Listen for button up events on all gamepads
gamepad.on("up", function (id, num) {
  console.log("up", {
    id: id,
    num: num,
  });
});

// Listen for button down events on all gamepads
gamepad.on("down", function (id, num) {
  console.log("down", {
    id: id,
    num: num,
  });
});
