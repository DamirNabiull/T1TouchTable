const allCategoryButtons = document.getElementsByClassName("categoryButton");

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
    'Оперэффективность': document.getElementById('i5'),
    'Видеоконференция': document.getElementById('i6'),
    'Воронка продаж': document.getElementById('i8'),
    'Транзакции': document.getElementById('i9'),
    'Обслуживание банков': document.getElementById('i9'),
    'Эмиссия карт': document.getElementById('i9'),
    'Автоматизация HR': document.getElementById('i7'),
    'AI-ассистенты HR': document.getElementById('i7')
}

var choosenCategories = 0;

for (const [key, value] of Object.entries(categoryToCard)) {
    value.value = 0;
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

function cardClick(card) {
    location.href = `./Pages/${card.id}.html`;
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