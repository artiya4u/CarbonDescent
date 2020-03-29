# CarbonDescent
Ride your real bicycle in GTA V

### Features
- Move the bicycle from ANT+ speed sensor.
- CarbonDescent mobile app for steering and monitor speed, cadence and heart rate.

### Setting up (Do this once)
- Install [NodeJS 12+](https://nodejs.org/) on your Windows Machine.
- Use [Zadig](http://sourceforge.net/projects/libwdi/files/zadig/) to install the WinUSB driver for your ANT+ USB stick. Open Zadig and goto menu "Options" select "List All Device", find "ANT USBStick2". Select "WinUS" and press install driver button.
- Copy files in `controller` to the GTA V game directory.
- Install Vjoy [Download the installer](https://sourceforge.net/projects/vjoystick/) and run it.
#### Xbox360ce setup
_Xbox360ce is a gamepad emulator that we will need in order to route control from vjoy to GTAV_
* Close GTAV if it's open
* Open x360ce_x64.exe in th GTAV folder and choose to create `xinput1_3.dll`
* Vjoy should then be automatically detected. Search for online settings and when it's done, click _Finish_
* Close xbox360ce
* Open the x360ce.ini and replace everything from `AxisToDPadDeadZone` down with [config](https://gist.githubusercontent.com/crizCraig/f680f65653641412eba28c3c47421bcf/raw/4abd3be3802555f57d96389bf0a189dad8cd90de/x360ce.ini)
* Save the file and reopen xbox360ce_x64.exe
- Press shift+right click on this directory in the file explore to open the command prompt and enter command `npm install`.
- Download the [Expo Client application](https://expo.io/tools#client) on your phone and get CarbonDescent app from https://expo.io/@artiya4u/carbon-descent .

### Starting CarbonDescent 
- Connect the ANT+ USB stick to your computer and keep the stick close to your sensors.
- Press shift and right click on this directory in the file explore to open the command prompt and enter command  `npm start`.
- The server will automatic connect the ANT+ sensors nearby, speed sensor is required, heart rate and cadence sensors are optional.
- Mount your phone on the real bicycle handlebar.
- Open the app, it should automatic connect to the server, to manually update server's connection, press "SERVER CONNECTION" button and enter the SERVER URL from the console.
- Open the GTA V game to story mode and get on a bicycle in game (Can buy it from "Pedal and Metal Cycles" website on phone).
- Press "GO" Button to set center of the steering and ride your real bike on a trainer and don't forget to turn on your fan on and get some drink and food. RIDE ON!

### TODOs
-[X] Automatic search for the server.
-[X] App icon.
