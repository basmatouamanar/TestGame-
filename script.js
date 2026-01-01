let a = document.getElementById("pabble")
let b = document.getElementById("board")
let bHeight = b.offsetHeight
let bdWidth = b.offsetWidth
let aHeight = a.offsetHeight
let aWidth = a.offsetWidth
let pabbleY = bHeight - 50
let pabbleX = bdWidth / 2 - (a.offsetWidth) / 2
a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`

// CHANGÉ: on track l'état des touches au lieu de bouger directement
let keysPressed = {
    left: false,
    right: false
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        keysPressed.right = true // CHANGÉ: marque comme pressée
    } else if (e.key === "ArrowLeft") {
        keysPressed.left = true // CHANGÉ: marque comme pressée
    }
})

// NOUVEAU: détecte quand on relâche la touche
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        keysPressed.right = false
    } else if (e.key === "ArrowLeft") {
        keysPressed.left = false
    }
})

// NOUVEAU: fonction pour bouger le paddle (smooth)
function movePaddle() {
    if (keysPressed.left) {
        pabbleX = pabbleX - 5 // CHANGÉ: de 50 à 5 pour smooth movement
    }
    if (keysPressed.right) {
        pabbleX = pabbleX + 5 // CHANGÉ: de 50 à 5 pour smooth movement
    }
    
    // CHANGÉ: boundary checks AVANT de render
    if (pabbleX < 0) pabbleX = 0
    if (pabbleX > bdWidth - a.offsetWidth) pabbleX = bdWidth - a.offsetWidth
    
    a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`
}

let element = document.getElementById("balle")
let board = document.getElementById("board")
let boardWidth = board.offsetWidth
let boardHeight = board.offsetHeight
let letterWidth = element.offsetWidth
let letterHeight = element.offsetHeight
let x = boardWidth / 2 - letterWidth / 2
let y = boardHeight / 2 - letterHeight / 2
let dx = 3 // CHANGÉ: de 1 à 3 (plus rapide)
let dy = 3 // CHANGÉ: de 1 à 3 (plus rapide)

function ball() {
    x = x + dx
    y = y + dy
    
    // CHANGÉ: boundary check AVANT de render (pas après)
    if (x <= 0) {
        x = 0
        dx = -dx
    }
    if (x + letterWidth >= boardWidth) {
        x = boardWidth - letterWidth
        dx = -dx
    }
    
    if (y <= 0) {
        y = 0
        dy = -dy
    }
    if (y + letterHeight >= boardHeight) {
        y = boardHeight - letterHeight
        dy = -dy
    }
    
    // CHANGÉ: collision fixée - vérifie TOUS les bords
    let ballLeft = x
    let ballRight = x + letterWidth
    let ballTop = y
    let ballBottom = y + letterHeight
    
    let paddleLeft = pabbleX
    let paddleRight = pabbleX + aWidth
    let paddleTop = pabbleY
    
    if (ballRight > paddleLeft && 
        ballLeft < paddleRight && 
        ballBottom >= paddleTop && 
        ballTop < paddleTop + aHeight &&
        dy > 0) {
        
        dy = -dy
        y = paddleTop - letterHeight 
    }
    
    element.style.transform = `translate(${x}px, ${y}px)`
    
    movePaddle() 
    
    requestAnimationFrame(ball)
}
requestAnimationFrame(ball)