'use strict';

const icon = document.querySelector('#icon');
const mandarinsAmountElement = document.querySelector('#m-amount');
const startButton = document.querySelector('#start-button');
const gameTime = document.querySelector('#game-time-txt');
const gameCanvas = document.querySelector('#game-canvas');
const fruit = document.querySelector('#fruit');
const grinch = document.querySelector('#grinch');
const difficultyModal = document.querySelector('#difficulty-modal');
const fruitModal = document.querySelector('#fruit-modal');

let mandarinsAmount = 0;
let gameDuration = 15;
let gameInterval;
let mandarinInterval;
let grinchIntervalDelay;
let difficultyInterval;

fruitModal.addEventListener('click', event => {
    switch (event.target) {
        case document.querySelector('#apple-btn'):
            fruit.src = "./images/apple.png";
            break;
        case document.querySelector('#banana-btn'):
            fruit.src = './images/banana.png';
            break;
        case document.querySelector('#cherry-btn'):
            fruit.src = './images/cherries.png';
            break;
        case document.querySelector('#grape-btn'):
            fruit.src = './images/grapes.png';
            break;
        case document.querySelector('#strawberry-btn'):
            fruit.src = './images/strawberry.png';
            break;
        case document.querySelector('#mandarin-btn'):
            fruit.src = './images/mandarin.png';
            break;
    }
    fruitModal.close();
    difficultyModal.showModal();
});

function checkDifficulty() {
    difficultyModal.addEventListener('click', event => {
        switch (event.target) {
            case document.querySelector('#easy-btn'):
                difficultyInterval = 1000;
                break;
            case document.querySelector('#medium-btn'):
                difficultyInterval = 800;
                break;
            case document.querySelector('#hard-btn'):
                difficultyInterval = 600;
                break;
        }
        difficultyModal.close();
        startGame();
    });
}

difficultyInterval = checkDifficulty();

function startGame() {
    icon.style.display = "block";
    gameTime.style.display = "block";
    resetGame();
    grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    mandarinInterval = setInterval(setMandarinPosition, difficultyInterval);
    gameInterval = setInterval(gameCount, 1000);
}

fruit.addEventListener('click', () => {
    mandarinsAmount++;
    mandarinsAmountElement.textContent = `${mandarinsAmount}`;
    setMandarinPosition();
    clearInterval(mandarinInterval);
    mandarinInterval = setInterval(setMandarinPosition, 1000);
});

grinch.addEventListener('click', () => {
    gameDuration = 15;
    gameTime.textContent = 'Game over!';
    icon.style.display = 'none';
    clearInterval(mandarinInterval);
    clearInterval(gameInterval);
    // mandarinsAmount--;
    mandarinsAmountElement.textContent = `${mandarinsAmount}`;
    startButton.disabled = false;
});

function resetGame() {
    gameDuration = 15;
    mandarinsAmount = 0;
    mandarinsAmountElement.textContent = '0';
    gameTime.textContent = `${gameDuration} seconds left`;
}

function setMandarinPosition() {
    icon.style.left = Math.round(Math.random() * (gameCanvas.clientWidth - icon.clientWidth)) + 'px';
    icon.style.top = Math.round(Math.random() * (gameCanvas.clientHeight - icon.clientHeight)) + 'px';

    if (gameDuration === grinchIntervalDelay) {
        fruit.style.display = 'none';
        grinch.style.display = 'block';
        grinchIntervalDelay = Math.round(Math.random() * gameDuration);
    } else {
        fruit.style.display = 'block';
        grinch.style.display = 'none';
    }
}

function gameCount() {
    if (gameDuration === 1) {
        icon.style.display = "none";
        gameTime.textContent = 'Game over!';
        clearInterval(gameInterval);
        clearInterval(mandarinInterval);
        startButton.disabled = false;
        return;
    }

    gameDuration -= 1;
    gameTime.textContent = `${gameDuration} seconds left`;
}

startButton.addEventListener('click', () => {
    startButton.disabled = true;
    fruitModal.showModal();
});


