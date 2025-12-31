
let element = document.getElementById("letter")
let board = document.getElementById("board")
let boardWidth = board.offsetWidth
let boardHeight = board.offsetHeight
let letterWidth = element.offsetWidth
let letterHeight = element.offsetHeight
let x = boardWidth / 2 - letterWidth / 2
let y = boardHeight / 2 - letterHeight / 2
let dx = 3
let dy = 3

function ball() {
    x = x + dx
    y = y + dy
    if (x <= 0 || (x + letterWidth) >= boardWidth) {
        dx = -dx 
    }
    if (y <= 0 || (y + letterHeight) >= boardHeight) {
        dy = -dy 
    }
    element.style.transform = `translate(${x}px, ${y}px)`
    
    requestAnimationFrame(ball)
}
requestAnimationFrame(ball)

/*
if (A+(letterWidth/2) >= board.length) touche le mur
if (A <= 0 ) touche le mur 
*/