// ELECTRON
const { ipcRenderer } = require('electron');

// BUTTONS
const allCategoryButtons = document.getElementsByClassName("categoryButton");
const allDisplayButtons = document.getElementsByClassName("displayButton");

// CONTENT
const content = document.getElementsByClassName("content")[0];
const info = document.getElementsByClassName("info")[0];
const qrCode = document.getElementsByClassName("qrCode")[0];
const videoButton = document.getElementsByClassName("videoButton")[0];

const buttonsContainerBack = document.getElementsByClassName("buttonsContainerBack")[0];
const displayButtonColorInactive = '#c4c4c4cc';
const displayButtonColorActive = '#ffffff00';
const leftButton = document.getElementById('leftButt');
const rightButton = document.getElementById('rightButt');

// MENU
const menu = document.getElementsByClassName("menu")[0];
const indicators = document.getElementsByClassName("indicator");
const offCategories = document.getElementsByClassName("offCategories")[0];

const categoryToCard = {
    'Финтех': document.getElementById('i1'),
    'Цифровой банкинг': document.getElementById('i1'),
    'Трансформация бизнеса': document.getElementById('i3'),
    'Энтерпрайз платформа': document.getElementById('i3'),
    'Управление разработкой': document.getElementById('i3'),
    'Большие данные': document.getElementById('i4'),
    'Машинное обучение': document.getElementById('i4'),
    'Open Source': document.getElementById('i2'),
    'Облачная платформа': document.getElementById('i2'),
    'Оперэффективность': document.getElementById('i5'),
    'Видеоконференция': document.getElementById('i6'),
    'Защищенность данных': document.getElementById('i6'),
    'Воронка продаж': document.getElementById('i8'),
    'Транзакции': document.getElementById('i9'),
    'Обслуживание банков': document.getElementById('i9'),
    'Эмиссия карт': document.getElementById('i9'),
    'Автоматизация HR': document.getElementById('i7'),
    'AI-ассистенты HR': document.getElementById('i7')
}

var choosenCategories = 0;
var displayActive = 0;
var currentCard = '';

for (const [key, value] of Object.entries(categoryToCard)) {
    value.value = 0;
}

for (var i = 0; i < allDisplayButtons.length; i++) {
    allDisplayButtons[i].value = false;
}

ipcRenderer.on('video-response', (event, arg) => {
    if (arg.left) {
        leftButton.value = false;
        leftButton.style.backgroundColor = displayButtonColorActive;
    }
    else {
        rightButton.value = false;
        rightButton.style.backgroundColor = displayButtonColorActive;
    }
    displayActive -= 1;
});

function ButtonClick(button) {
    if (button.value == false) {
        button.value = true;
        displayActive += 1;
        button.style.backgroundColor = displayButtonColorInactive;
        let Data = {
            left: button.id == 'leftButt',
            source: currentCard
        };
        ipcRenderer.send('video-sender-clicked', Data);
    }
}

function buttonsContainerClick() {
    buttonsContainerBack.style.display = 'none';
}

function videoButtonClick() {
    buttonsContainerBack.style.display = 'inline';
}

function backClick() {
    content.style.display = "none";
    menu.style.display = "inline";
}

function cardClick(card) {
    offFilters();
    currentCard = card.id;
    info.src = `./Assets/Content/${card.id}.png`;
    qrCode.src = `./Assets/QR/${card.id}.png`;
    videoButton.style.backgroundImage = `url(./Assets/VideoButtons/${card.id}.png)`;
    content.style.display = "inline";
    menu.style.display = "none";
}

function categoryClick(button) {
    let tempColor = window.getComputedStyle(button).backgroundColor;
    if (button.value == "on") {
        if (categoryToCard[button.innerHTML].value == 1) {
            categoryToCard[button.innerHTML].style.display = "inline";
        }
        if (choosenCategories == 1) {
            closeIndicators();
        }
        choosenCategories -= 1;
        button.value = "off";
        categoryToCard[button.innerHTML].value -= 1;
    }
    else {
        if (choosenCategories == 0) {
            showIndicators();
        }
        if (categoryToCard[button.innerHTML].value == 0) {
            categoryToCard[button.innerHTML].style.display = "none";
        }
        choosenCategories += 1;
        button.value = "on";
        categoryToCard[button.innerHTML].value += 1;
    }
    // console.log(button.innerHTML);
    // console.log(categoryToCard[button.innerHTML].value);
    // console.log(choosenCategories);
    button.style.backgroundColor = window.getComputedStyle(button).color;
    button.style.color = tempColor;
}

function showIndicators() {
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].style.display = "inline";
    }
    offCategories.style.display = "inline";
}

function closeIndicators() {
    for (var i = 0; i < indicators.length; i++) {
        indicators[i].style.display = "none";
    }
    offCategories.style.display = "none";
}

function offFilters() {
    closeIndicators();
    choosenCategories = 0;
    for (var i = 0; i < allCategoryButtons.length; i++) {
        var butt = allCategoryButtons[i]
        if (butt.value == "on") {
            let tempColor = window.getComputedStyle(butt).backgroundColor;
            butt.value = "off";
            categoryToCard[butt.innerHTML].value = 0;
            butt.style.backgroundColor = window.getComputedStyle(butt).color;
            butt.style.color = tempColor;
        }
    }
}