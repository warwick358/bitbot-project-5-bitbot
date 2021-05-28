# Bitbot-project-5-bitbot

## Step 1 set our radio group
Firstly we will set our radio group to match the radio channel used to send data from our controller micro:bit. 
Instead of sending this time, we'll put our code in the ​on radio received​ block and use an ​"if..then​" block to decide which data is 'pitch' and which is 'roll'.
You'll also need to create two variables called 'raw_Roll' and 'raw_Pitch' - we'll store the received data in these.

Go to the "radio" tab and select the "set group" block and place it in the "on start" block. the number in the block should be the same as the number in the controller you made in the previous tutorial.
then go to the "variable" tab and create 2 variable's called"rawroll" and "rawpitch".
```block
radio.setGroup(1)
```

## Step 2 creating the receive information.
open the "radio" tab and get a "on radio received name value" block.
Go to the "logic" tab and get a "if then" block and place it in the "on radio received name value" block.
Next go to the "logic" tab under comparison look for the "0 = 0" block and replace "true" in the 'If then" block.
From the "on radio received name value" block drag "name" into the first "0" in the "0 = 0" block and the second "0" with "pitch"
go to the "variable" tab and select the "set to" block and place it in the "if then" block.
Chenge the dropdown tab to "raw_pitch" 
From the "on radio received name value" block drag "value" and replace the "0"

Copy the entire "if then" block with the "set to" block and place it under the "if then" block in the "on radio received name value" block.
In the "if then" change "pitch" to "roll"
In the "set to" block change the dropdown to "raw_roll"

```block
radio.onReceivedValue(function (name, value) {
    if (name == "pitch") {
        raw_pitch = value
    }
    if (name == "roll") {
        raw_roll = value
    }
})
let raw_roll = 0
let raw_pitch = 0
radio.setGroup(1)
```
## Step 3 Convert 'roll' data into left and right motor speeds
The roll or pitch data is an angle, so we need to check whether the controller micro:bit is tilted: 
●  right (roll greater than 10 degrees) 
●  left (roll less than -10 degrees)

These variables are used to hold the speed we want each motor to run at. But before we send these to the motors, we should check if the micro:bit controller is not tilted left or right. Although this should be 0 degrees, we're human so we'll say between -10 and 10 degree just to make the controls a bit easier. 

If the answer is left, the value is going to be negative and this would make the motor go the wrong way, so we multiply it by -1.

You'll need to create two more variables: rightMotor, and leftMotor for the code. 
Go to the "variable" tab and create the variable's "rightMotor", and "leftMotor"

## Step 4 Roll controll of motors
We are going to create 2 "if then" blocks that will look almost identical to controlthe left and right motors.



## all the code
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
        left_motor = raw_pitch * -1
    }
    bitbot.rotate(BBRobotDirection.Left, Math.map(left_motor, 0, 180, 0, 1024))
    bitbot.rotate(BBRobotDirection.Right, Math.map(right_motor, 0, 180, 0, 1024))
})
