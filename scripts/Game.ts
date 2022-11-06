
import {Image, SaveFeatures, Text, getWindowSize, randomInt, getMousePosition} from "./Engine.js";

let background = new Image('https://wallpapercave.com/wp/wp7667538.jpg', 0, 0, getWindowSize()[0], getWindowSize()[1]);
background.element.setAttribute('draggable', 'false');

let cookie = new Image('../Image/cookie.png', 0, 0, 256, 256);
cookie.element.setAttribute('draggable', 'false');

cookie.center(background);
cookie.move(0, -200);

let cookieCount: number = SaveFeatures.loadOr<number>('cookies', 0);

let cookieCountElem = new Text(`${cookieCount} Cookies`, 0,0);
cookieCountElem.element.style.color = 'white';
cookieCountElem.move(100,0);
cookieCountElem.element.style.fontSize = '45px';


let cookiesPerClick = 1;

cookie.addEvent('mouseover', function(event) {
    cookie.scale(10, 10)
})
cookie.addEvent('mouseout', function(event) {
    cookie.scale(-10, -10)
});

cookie.addEvent('click', function(event) {
    cookieCount++;
    cookieCountElem.updateText(`${cookieCount} Cookies`);

    SaveFeatures.save<number>('cookies', cookieCount);

    let mouseX = getMousePosition()[0];
    let mouseY = getMousePosition()[1];

    let cookiePerClickElem = new Text(`+${cookiesPerClick}`, mouseX + randomInt(-100, 120), mouseY + randomInt(-100, 120));
    cookiePerClickElem.element.style.color = 'white';
    cookiePerClickElem.element.style.fontSize = '35px';
    cookiePerClickElem.element.style.pointerEvents = 'none';

    let cookieClickDisplayTimeout = setTimeout(function() {
        cookiePerClickElem.destroy()
        clearTimeout(cookieClickDisplayTimeout);
    }, 1000);
})



