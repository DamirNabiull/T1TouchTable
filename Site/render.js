const allCategoryButtons = document.getElementsByClassName("categoryButton");

// MENU
const menu = document.getElementsByClassName("menu")[0];
const indicatorsLabel = document.getElementsByClassName("indicatorsLabel")[0];

var choosenCategories = 0;

function categoryClick(button) {
    let tempColor = window.getComputedStyle(button).backgroundColor;
    if (button.value == "on") {
        choosenCategories -= 1;
        button.value = "off";
    }
    else {
        choosenCategories += 1;
        button.value = "on";
    }
    console.log(choosenCategories);
    button.style.backgroundColor = window.getComputedStyle(button).color;
    button.style.color = tempColor;
}

function cardClick(card) {
    location.href = `./Pages/${card.id}.html`;
}