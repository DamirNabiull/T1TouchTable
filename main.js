const { app, BrowserWindow, ipcMain } = require('electron');
const electron = require('electron')
var mainWin, leftVideoWin, rightVideoWin;
var Data = {
	left: true
}

app.whenReady().then(() => {
	let displays = electron.screen.getAllDisplays();
	var neededDisplays = [];
	for (var display of displays) {
		if (display.bounds.x !== 0 || display.bounds.y !== 0) {
			neededDisplays.push(display)
		}
	}
	const display1 = neededDisplays[0];
	const display2 = neededDisplays[neededDisplays.length-1];
	// let externalDisplay = displays.find((display) => {
	// 	return display.bounds.x !== 0 || display.bounds.y !== 0
	// })

	console.log(neededDisplays)

	// MAIN WIN
	mainWin = new BrowserWindow({
		width: 1920,
		height: 1080,
		transparent: false,
		hasShadow: false,
		frame: false,
		resizable: false,
		alwaysOnTop: true,
		minimizable: false,
		maximizable: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	mainWin.setVisibleOnAllWorkspaces(false, {
		visibleOnFullScreen: false,
		skipTransformProcessType: false,
	});

	mainWin.loadFile('Site/index.html');

	// LEFT WIN
	leftVideoWin = new BrowserWindow({
		width: 1920,
		height: 1080,
		x: display1.bounds.x,
      	y: display1.bounds.y,
		transparent: false,
		hasShadow: false,
		frame: false,
		resizable: false,
		alwaysOnTop: true,
		minimizable: false,
		maximizable: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	leftVideoWin.setVisibleOnAllWorkspaces(false, {
		visibleOnFullScreen: false,
		skipTransformProcessType: false,
	});

	leftVideoWin.loadFile('Site/VideoPages/videoPanel.html');


	// RIGHT WIN
	rightVideoWin = new BrowserWindow({
		width: 1920,
		height: 1080,
		x: display2.bounds.x,
      	y: display2.bounds.y,
		transparent: false,
		hasShadow: false,
		frame: false,
		resizable: false,
		alwaysOnTop: true,
		minimizable: false,
		maximizable: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	rightVideoWin.setVisibleOnAllWorkspaces(false, {
		visibleOnFullScreen: false,
		skipTransformProcessType: false,
	});

	rightVideoWin.loadFile('Site/VideoPages/videoPanel.html');


	// FUNCTIONS
	
	leftVideoWin.webContents.send('set-video-pos', Data);
	Data.left = false;
	rightVideoWin.webContents.send('set-video-pos', Data);

	ipcMain.on('video-sender-clicked', (event, arg) => {
		if (arg.left == true) {
			leftVideoWin.webContents.send('start-video', arg);
		}
		else {
			rightVideoWin.webContents.send('start-video', arg);
		}
    });

	ipcMain.on('video-ended-response', (event, arg) => {
		mainWin.webContents.send('video-response', arg);
    });
})