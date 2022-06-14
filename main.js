const { app, BrowserWindow, ipcMain } = require('electron');
const electron = require('electron')
var mainWin, leftVideoWin, rightVideoWin;
const DataLeft = {
	left: true
}
const DataRight = {
	left: false
}

app.whenReady().then(() => {
	let displays = electron.screen.getAllDisplays();
	var neededDisplays = [];
	var displayLeft, displayRight;
	for (var display of displays) {
		if (display.bounds.x !== 0 || display.bounds.y !== 0) {
			neededDisplays.push(display)
		}
		if (display.id == 2779098405) {
			displayLeft = display;
		}
		if (display.id == 2841568472) {
			displayRight = display;
		}
	}

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

	mainWin.setVisibleOnAllWorkspaces(true, {
		visibleOnFullScreen: true,
		skipTransformProcessType: true,
	});

	mainWin.loadFile('Site/index.html');

	// LEFT WIN
	leftVideoWin = new BrowserWindow({
		fullscreen: false,
		fullscreenable: true,
		frame: false,
		x: displayLeft.bounds.x,
		y: displayLeft.bounds.y,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	leftVideoWin.setVisibleOnAllWorkspaces(true, {
		visibleOnFullScreen: true,
		skipTransformProcessType: true,
	});

	leftVideoWin.loadFile('Site/VideoPages/videoPanel.html');


	// RIGHT WIN
	rightVideoWin = new BrowserWindow({
		fullscreen: false,
		fullscreenable: true,
		frame: false,
		x: displayRight.bounds.x,
		y: displayRight.bounds.y,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	rightVideoWin.setVisibleOnAllWorkspaces(true, {
		visibleOnFullScreen: true,
		skipTransformProcessType: true,
	});

	rightVideoWin.loadFile('Site/VideoPages/videoPanel.html');


	// FUNCTIONS

	leftVideoWin.setMenuBarVisibility(false)

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

	setTimeout(() => {
		leftVideoWin.maximize();
		rightVideoWin.maximize();
	}, 2000);

	setTimeout(() => {
		leftVideoWin.setFullScreen(true);
		rightVideoWin.setFullScreen(true);
		leftVideoWin.webContents.send('set-video-pos', DataLeft);
		rightVideoWin.webContents.send('set-video-pos', DataRight);
	}, 3000);
})