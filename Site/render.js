const allCategoryButtons = document.getElementsByClassName("categoryButton");

// MENU
const menu = document.getElementsByClassName("menu")[0];
const indicatorsLabel = document.getElementsByClassName("indicatorsLabel")[0];
const indicators = document.getElementsByClassName("indicator");

var choosenCategories = 0;

function categoryClick(button) {
    let tempColor = window.getComputedStyle(button).backgroundColor;
    if (button.value == "on") {
        if (choosenCategories == 1) {
            indicatorsLabel.style.display = "none";
        }
        choosenCategories -= 1;
        button.value = "off";
    }
    else {
        if (choosenCategories == 0) {
            indicatorsLabel.style.display = "inline";
        }
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