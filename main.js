const { app, BrowserWindow } = require('electron');
var win1, win2;

app.whenReady().then(() => {
	win1 = new BrowserWindow({
		width: 1920,
		height: 1080,
		transparent: false,
		hasShadow: false,
		frame: false,
		resizable: false,
		alwaysOnTop: false,
		minimizable: false,
		maximizable: true,
		kiosk: true,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false
		},
	})

	win1.setVisibleOnAllWorkspaces(false, {
		visibleOnFullScreen: false,
		skipTransformProcessType: false,
	});
	
	win1.loadFile('Site/index.html');
})