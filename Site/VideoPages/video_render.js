// Electron
const { ipcRenderer } = require('electron');

const video = document.getElementById('video');
const videoSrc = document.getElementById('videoSrc');
var play = false;
var isLeft = false;

video.addEventListener('ended', (event) => {
    if (play) {
        play = false;
        videoSrc.src = '../Assets/Video/idle.mp4';
        video.load();
        let Data = {
            left: isLeft,
        }
        ipcRenderer.send('video-ended-response', Data);
    }
    video.play();
});

ipcRenderer.on('set-video-pos', (event, arg) => {
    isLeft = arg.left;
    console.log(isLeft);
});

ipcRenderer.on('start-video', (event, arg) => {
    play = true;
    videoSrc.src = `../Assets/Video/${arg.source}.mp4`;
    video.load();
    video.play();
});