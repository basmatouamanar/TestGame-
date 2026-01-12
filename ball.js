import { gameOverLose, brickHeight, brickWidth, boardRec, addenmiesToDOM, scoreElement, addScoreToDOM, lives, bricks, addBriksToDOM, paddleElement, ballElement, boardElement, boardHeight, boardWidth, paddleHeight, paddleWidth, keyword } from "./variables.js"

let paddleY = boardHeight - 50
let paddleX = boardWidth / 2 - (paddleWidth) / 2
export let ballLaunched = false
let countLive = 0
let fail = false
export let score = 0;

let dx = 1
let dy = 1 


let ballWidth = ballElement.offsetWidth
let ballHeight = ballElement.offsetHeight
let boardLeft = boardRec.left
let boardTOP = boardRec.top

let x = paddleX + (paddleWidth / 2) - (ballWidth / 2)
let y = paddleY - ballHeight
let enmieDem = 30 
let rewardDem = 20

export function getScore() {
    return score;
}

export function addScore(v) {
    score += v;
}

paddleElement.style.transform = `translate(${paddleX}px, ${paddleY}px)`


function movePabble() {
        if (keyword.right) {
            paddleX = paddleX + 8
        }
        if (keyword.left) {
            paddleX = paddleX - 8
        }
        if (paddleX > boardWidth - paddleWidth - 5) paddleX = boardWidth - paddleWidth - 5
        if (paddleX < 0) paddleX = 0
        paddleElement.style.transform = `translate(${paddleX}px,  ${paddleY}px)`
    

}
document.addEventListener("keydown", (e) => {
    if (e.code === 'Space') {
        ballLaunched = true
        dx = Math.random() * 20 - 10;
        dy = 5;
    }
    if (e.key === "ArrowRight") {
        keyword.right = true
    } else if (e.key === "ArrowLeft") {
        keyword.left = true
    }
})

let paused = false
document.getElementById("StopBtn").addEventListener("click", () => {
    paused = !paused  
})

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        keyword.right = false
    }
    if (e.key === "ArrowLeft") {
        keyword.left = false
    }
})




addBriksToDOM()
setInterval(addScoreToDOM, 1000)
setInterval(addenmiesToDOM, 3000)






let gameOver = false 
let brickfinished = false 
let brickRemoved = 33

function ball() {
    x = x + dx
    y = y + dy
   if (x <= 0) {
        x = 0;
        dx = -dx;
    }
    if (x + ballWidth >= boardWidth) {
        x = boardWidth - ballWidth;
        dx = -dx;
    }
    if (y <= 0) {
        y = 0;
        dy = -dy;
    }
    if ((y + ballHeight) >= boardHeight) {
        let oneLive = lives.querySelector('.live')
        if (oneLive) {
            oneLive.remove()
            score -= 15
            if (score < 0) {
                score = 0
            }
            scoreElement.innerHTML = `score: ${score}`
        }
        ballLaunched = false
        countLive++
        fail = true
    }
    let ydown = y
    if (ydown >= paddleY && y <= paddleY + paddleHeight && x + ballWidth >= paddleX && x <= paddleX + paddleWidth) {
        dy = -dy

        let contact = (x + ballWidth / 2 - paddleX) / paddleWidth
        let maxDX = 5
        dx = (contact - 0.5) * 2 * maxDX
    }
    for (let i = 0; i < bricks.length; i++) {
        let brick = bricks[i]

        if (
            x < brick.x + brickWidth &&
            x + ballWidth > brick.x &&
            y < brick.y + brickHeight &&
            y + ballHeight > brick.y
        ) {
            dy = -dy
            brick.el.remove()
            brickRemoved-- 
            if (brickRemoved === 0 ) {
               window.location.href = "gameOver.html";
              //  brickfinished = true
            }
            bricks.splice(i, 1)
            
            score += 10
            scoreElement.innerHTML = `score: ${score}`


            break
        }
    }




}
let a = 0
function loop() {

    if (!paused ) {
        movePabble()
    
        if (!ballLaunched || fail) {
            x = paddleX + (paddleWidth / 2) - (ballWidth / 2)
            y = paddleY - ballHeight
            if (countLive < 3) {
                fail = false
            } else {
                a++
                if(a==1){
                let end = document.createElement('div');
                end.className = 'endGame';
                end.innerHTML = gameOverLose;
                document.body.appendChild(end);
                const s = end.querySelector('#scoreCount');
                if (s) {
                    s.textContent = score;
                }
                const retryBtn = end.querySelector('#retryBtn');
    
                retryBtn.addEventListener('click', () => {
                   
    
                    end.remove();
    
                  
                    score = 0;
                    countLive = 0;
                    fail = false;
                    a = 0;
    
                  //  resetBall();       
                  //  clearBricks();      
                    addBriksToDOM();  
                  //  startGameLoop();    
                });
    
            }}
    
        } else {
            ball()
        }
        
    }
    ballElement.style.transform = `translate(${x}px, ${y}px)`
    requestAnimationFrame(loop)
}
let lastTimeEnemy = 0;
let lastTimeReward = 0;

function animateRewardOrEnemie(typ, Dim, sc, time = 0) {
    const isEnemy = typ === 'enmie';
    const lastTime = isEnemy ? lastTimeEnemy : lastTimeReward;

    const delta = (time - lastTime) / 1000;
    if (isEnemy) lastTimeEnemy = time;
    else lastTimeReward = time;

    const speed = 200;
    const elements = [...document.getElementsByClassName(typ)];
    if (ballLaunched) {
        for (let el of elements) {


            if (el.y === undefined) {
                const rect = el.getBoundingClientRect();
                el.x = rect.left - boardRec.left;
                el.y = 0;
            }

            el.y += speed * delta;

            const elementX = el.x;
            const elementY = el.y;




            if (
                elementX > paddleX - Dim / 2 &&
                elementX <= paddleX + paddleWidth &&
                elementY >= paddleY - Dim
            ) {


                el.remove();
                score = Math.max(0, score + sc);
                scoreElement.innerHTML = `score: ${score}`;
                continue;
            }

            // missed
            if (elementY + Dim / 2 >= paddleY + paddleHeight) {
                el.remove();
                continue;
            }

            el.style.transform = `translate(${elementX}px, ${elementY}px)`;
        }
    }
    requestAnimationFrame((t) =>
        animateRewardOrEnemie(typ, Dim, sc, t)
    );
}

// start once
requestAnimationFrame((t) =>
    animateRewardOrEnemie('enmie', enmieDem, -15, t)
);
requestAnimationFrame((t) =>
    animateRewardOrEnemie('reward', rewardDem, 5, t)
);


requestAnimationFrame(loop)







