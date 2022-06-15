// Electron
const { ipcRenderer } = require('electron');

const video = document.getElementById('video');
const videoSrc = document.getElementById('videoSrc');
var play = false;
var isLeft = false;

video.addEventListener('ended', (event) => {
    if (play) {
        console.log(`${isLeft} - Stoped`)
        videoSrc.src = '../Assets/Video/idle.mp4';
        video.load();
        let Data = {
            left: isLeft,
        }
        ipcRenderer.send('video-ended-response', Data);
        play = false;
    }
    video.play();
});

console.log(isLeft)

ipcRenderer.on('set-video-pos', (event, arg) => {
    isLeft = arg.left;
    console.log(isLeft);
    if (isLeft) {
        video.muted = !video.muted
    }
});

ipcRenderer.on('start-video', (event, arg) => {
    videoSrc.src = `../Assets/Video/${arg.source}.mp4`;
    video.load();
    video.play();
    play = true;
});