import {  ballLaunched, score } from "./ball.js"
export let paddleElement = document.getElementById("paddle")
export let boardElement = document.getElementById("board")
export let ballElement = document.getElementById("balle")
export let lives = document.getElementById("live")
export let scoreElement = document.getElementById("score")
export let boardRec = ballElement.getBoundingClientRect()




export let boardHeight = boardElement.offsetHeight
export let boardWidth = boardElement.offsetWidth
export let paddleHeight = paddleElement.offsetHeight
export let paddleWidth = paddleElement.offsetWidth
export let keyword = {
    left: 0,
    right: 0
}
export let bricks = []
let rows = 3;
let cols = 11;
let gap = 4
export let brickRemoved = 33
export let brickWidth = (boardWidth - gap * (cols - 1)) / cols - 2
export let brickHeight = (boardHeight * 0.06)
export function addBriksToDOM() {

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let brick = document.createElement('div');
            brick.className = "brick";

            brick.style.width = `${brickWidth}px`;
            brick.style.height = `${brickHeight}px`;
            brick.style.backgroundColor = "saddlebrown";
            brick.style.position = "absolute";
            brick.style.left = 5 + (j * (brickWidth + gap)) + "px"; // == 90px
            brick.style.top = 10 + (i * (brickHeight + gap)) + "px";
            bricks.push({
                x: parseInt(brick.style.left),
                y: parseInt(brick.style.top),
                el: brick
            })
            boardElement.appendChild(brick);
        }
    }
    for (let u = 0; u < 3; u++) {
        let live = document.createElement('img')
        live.src = './images/heart.png'
        live.className = "live"
        live.style.width = "30px"
        live.style.height = "30px"
        live.style.margin = "2px"
        live.style.borderRadius = "10px"
        lives.appendChild(live)

    }
}
export function addScoreToDOM() {
    if (ballLaunched) {
        let randtime = randomInt(2000, 8000)

        setTimeout(() => {
            if (ballLaunched) {
                let numberOfScoreReward = randomInt(0, 3)
                for (let i = 0; i < numberOfScoreReward; i++) {
                    let reward = document.createElement('div')
                    reward.classList.add('reward')

                    reward.style.backgroundImage = "url('./images/coin.png')"
                    reward.style.backgroundSize = "cover";       // make it fill the div
                    reward.style.backgroundPosition = "center";  // center the image
                    reward.style.backgroundRepeat = "no-repeat";
                    reward.id = 'reward'

                    reward.style.transform = `translate(${randomInt(0, boardWidth - reward.offsetWidth - 20)}px, 0px)`
                    boardElement.appendChild(reward)
                }
            }

        }, randtime)
    }
}
export function addenmiesToDOM() {
    if (ballLaunched) {
        let randtime = randomInt(2000, 8000)

        setTimeout(() => {
            if (ballLaunched) {
                let numberOfenmies = randomInt(0, 2)
                for (let i = 0; i < numberOfenmies; i++) {
                    let enmie = document.createElement('div')
                    enmie.classList.add('enmie')
                    enmie.style.backgroundImage = "url('./images/bomb.png')"
                    enmie.style.backgroundSize = "cover";       // make it fill the div
                    enmie.style.backgroundPosition = "center";  // center the image
                    enmie.style.backgroundRepeat = "no-repeat";
                    enmie.id = 'enmie'

                    enmie.style.transform = `translate(${randomInt(0, boardWidth - enmie.offsetWidth - 20)}px, 0px)`
                    boardElement.appendChild(enmie)
                }
            }

        }, randtime)
    }
}

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export let start = `
<div class='startContainer'>
<div class='startTitle'>brick-breaker</div>
<image class='startButton' src=./images/play-button.png>
</div>

`
export let gameOverLose = `

       <div class='stars'>
            <span><img class='star' src=./images/starlos.png></span><span><img class='star'
                    src=./images/starlos.png></span><span><img class='star' src=./images/starlos.png></span>
        </div>
        <h1>💥 You Lose</h1>
        <div class="scorediv">score</div>
        <div class="scoreCount" id="scoreCount"></div>
       
        <p>Your ball fell… but you can try again!</p>
        <img id="retryBtn" src="./images/refresh-action.png">
        <div>Retry</div>

  

`