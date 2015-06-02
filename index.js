var gamepad = require("gamepad");
var five = require("johnny-five");
var board = new five.Board({
  port: 'COM3',
  repl: false
});

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

board.on("ready", function() {
  // Johnny-Five provides pre-packages shield configurations!
  // http://johnny-five.io/api/motor/#pre-packaged-shield-configs
  var motors = new five.Motors([
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M1,
    five.Motor.SHIELD_CONFIGS.POLOLU_DRV8835_SHIELD.M2,
  ]);

  // Listen for move events on all gamepads
  gamepad.on("move", function (id, axis, value) {
    var MAX_SPEED = 255;
    var val = value * 100;
    var speed = 255 * Math.abs(value);
    var wheel, wheelName;

    if (axis === 1) {
      wheel = motors[1];
      wheelName = 'Left';
    } else if (axis === 3) {
      wheel = motors[0];
      wheelName = 'Right';
    } else {
      return;
    }

    console.log(wheelName + ' Wheel: ' + val);

    // TODO: Keep track if the wheel is stopped or not.
    // If stopped, no need to call stop again.
    if (val > -10 || val < 10) {
      wheel.stop();
    }

    if (val < -10) {
      wheel.rev(speed);
    }

    if (val > 10) {
      wheel.fwd(speed);
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
});


