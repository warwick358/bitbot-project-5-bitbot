radio.onReceivedValue(function (name, value) {
    if (name == "pitch") {
        raw_pitch = value
    }
    if (name == "roll") {
        raw_roll = value
    }
})
let left_motor = 0
let right_motor = 0
let raw_roll = 0
let raw_pitch = 0
radio.setGroup(1)
basic.forever(function () {
    if (raw_roll < -10) {
        right_motor = raw_roll * -1
        left_motor = 0
    }
    if (raw_roll > 10) {
        left_motor = raw_roll
        right_motor = 0
    }
    if (-10 < raw_roll && raw_roll < 10) {
        left_motor = raw_pitch * -1
        right_motor = raw_pitch * -1
    }
    bitbot.rotate(BBRobotDirection.Left, Math.map(left_motor, 0, 180, 0, 1024))
    bitbot.rotate(BBRobotDirection.Right, Math.map(right_motor, 0, 180, 0, 1024))
})
