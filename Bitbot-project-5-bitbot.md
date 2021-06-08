# Bitbot-project-5-bitbot

## Step 1 
Set our radio group

Firstly we will set our radio group to match the radio channel used to send data from our controller micro:bit. 
Instead of sending this time, we'll put our code in the on radio received block and use an "if then" block to decide which data is 'pitch' and which is 'roll'.
You'll also need to create two variables called 'raw_Roll' and 'raw_Pitch' - we'll store the received data in these.

Go to the "radio" tab and select the "set group" block and place it in the "on start" block. The number in the block should be the same as the number in the controller you made in the previous tutorial.
Then go to the "variable" tab and create 2 variable's called"rawroll" and "rawpitch".
```block
radio.setGroup(1)
```

## Step 2 
Creating the receive information.

Open the "radio" tab and get a "on radio received name value" block.
Go to the "logic" tab and get a "if then" block and place it in the "on radio received name value" block.
Next go to the "logic" tab under comparison look for the "0 = 0" block and replace "true" in the 'If then" block.
From the "on radio received name value" block drag "name" into the first "0" in the "0 = 0" block and the second "0" with "pitch".
Go to the "variable" tab and select the "set to" block and place it in the "if then" block.
Chenge the dropdown tab to "raw_pitch" 
From the "on radio received name value" block drag "value" and replace the "0".

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
## Step 3 
Convert 'roll' data into left and right motor speeds

The roll or pitch data is an angle, so we need to check whether the controller micro:bit is tilted: 
●  right (roll greater than 10 degrees) 
●  left (roll less than -10 degrees)

These variables are used to hold the speed we want each motor to run at. But before we send these to the motors, we should check if the micro:bit controller is not tilted left or right. Although this should be 0 degrees, we're human so we'll say between -10 and 10 degree just to make the controls a bit easier. 

If the answer is left, the value is going to be negative and this would make the motor go the wrong way, so we multiply it by -1.

You'll need to create two more variables: rightMotor, and leftMotor for the code. 
Go to the "variable" tab and create the variable's "rightMotor", and "leftMotor"

## Step 4 
Roll controll of motors


We are going to create 2 "if then" blocks that will look almost identical to controlthe left and right motors.
First go to the "logic" tab and get a "if then" block and place it in the "froever" block.
Next go to the "logic" tab, "comparison" and get a "0 < 0" block and place it the "true" space of the "if then" block.
Then go to the "variable" tab and get "right_motor" and replace the first "0" from the "0 < 0" block, replace the second "0" with "-10".
Now take 2 "set to" blocks from the "variable" tab and place them under the "then" in the "if then" block.
In the first "set to" block change the dropdown to "right_motor" and replace the "0" with "0 x 0" from the "math" tab.
In the "0 x 0" block replace the first "0" with the "roll_raw" block from the "variable" tab and the second "0" with "-1" this will changethe number from a negative to a posative.
In the second "set to" block change the dropdown to "left_motor" and leave the "0".

Copy the "if then" block and everything in it. Place the new "if then" block under the first one.
Change the comparison in the new "if then" to the following "roll_raw > 10".
Change the first "Set to" so that "Left_motor = raw_roll".
 Change the second "Set to" so that "right_motor = 0"

```block
})
let left_motor = 0
let right_motor = 0
let raw_roll = 0
let raw_pitch = 0
basic.forever(function () {
    if (raw_roll < -10) {
        right_motor = raw_roll * -1
        left_motor = 0
    }
    if (raw_roll > 10) {
        left_motor = raw_roll
        right_motor = 0
    }
})
```
## Step 5 
Useing the pitch (forward/backward) to get the speed and direction to move in a straight line.

We need to add another "if then" block from the "logic" tab under the last section in the "forever" block.
From the "logic tab "boolean" heading we need to add the "and" block in the "true" space of the "if then"block.
Next we go to the "logic" tab and then "comparison" to get the "0 < 0" Block and place it in the first tab of the "and" block.
The "comparison" "0 < 0" Block needs to look like "-10 < raw_roll" ("raw_roll" is from the "variable" tab).
In the second section of the "and" block we need another "logic" tab and then "comparison" block. "0 >0".
This "comparison" "0 > 0" Block needs to look like "raw_roll > 10" ("raw_roll" is from the "variable" tab).
Next go to the "variable" tab and get a "set to" block and place it under "then" in the "if then" block.
Use the dropdown to change to the "left_motor" and replace the "0" with a "0 x 0" block from the "math" tab, change the "0" to "-1".
Now copy the entire "set to" block and place it under the original "set to" block.
Use the dropdown to change to the "right_motor".
(Because the rawPitch value is the angle that the controller microbit is sending when tilted forwards the angle is negative. So we multiply by -1 changing the number to posative makeing the Bitbot go forwards.)

```block
let right_motor = 0
let left_motor = 0
basic.forever(function () {
    let raw_roll = 0
    if (raw_roll < -10) {
        right_motor = raw_roll * -1
        left_motor = 0
    }
    if (raw_roll > 10) {
        left_motor = raw_roll
        right_motor = 0
    }
    if (-10 < raw_roll && raw_roll < 10) {
        let raw_pitch = 0
        left_motor = raw_pitch * -1
        right_motor = raw_pitch * -1
    }
})
```

## Step 6 
Mapping the tilt angle to motor speeds

We are going to use a map block to convert the motorLeft and motorRight to motor speeds.
The last 2 blocks in the code are the same except one is for the left motor and the other is for the right.
Go to the "bitbot" "motors" tab and get a "spin at speed %" block and place it under the last "if then" block in the "forever" block.
Use the dropdown to change to the "left" option and go to the "math" tab and get the "map" block and replace the "0" in the "spin at speed %" block.
In the first "0" on the map block insert "left_motor" from the "variable" tab. The remaining numbers need to be "from low 0 to high 180 to low 0 to high 1024".
Now copy the entire block and place it under the first "spin at speed %" block, change the dropdown to "right" and replace the "left_motor" to "right_motor "left_motor" from the "variable" tab.

```block
let right_motor = 0
let left_motor = 0
basic.forever(function () {
    let raw_roll = 0
    if (raw_roll < -10) {
        right_motor = raw_roll * -1
        left_motor = 0
    }
    if (raw_roll > 10) {
        left_motor = raw_roll
        right_motor = 0
    }
    if (-10 < raw_roll && raw_roll < 10) {
        let raw_pitch = 0
        left_motor = raw_pitch * -1
        right_motor = raw_pitch * -1
    }
    bitbot.rotate(BBRobotDirection.Left, Math.map(left_motor, 0, 180, 0, 1024))
    bitbot.rotate(BBRobotDirection.Right, Math.map(right_motor, 0, 180, 0, 1024))
})
```

## Step 7 
Download the code to the Bitbot microbit.

 ```block
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
```


