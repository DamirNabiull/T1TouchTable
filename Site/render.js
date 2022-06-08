const allCategoryButtons = document.getElementsByClassName("categoryButton");

function categoryClick(button) {
    var tempColor = window.getComputedStyle(button).backgroundColor;
    button.style.backgroundColor = window.getComputedStyle(button).color;
    button.style.color = tempColor;
}
