
let element = document.getElementById("balle")
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


//let body = document.querySelector("body")
let a = document.getElementById("pabble")
let b = document.getElementById("board")
//let x = 0
let bHeight = b.offsetHeight
let bdWidth = b.offsetWidth
let pabbleY = bHeight - 50
let pabbleX = bdWidth / 2 - (a.offsetWidth) / 2
a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        pabbleX = pabbleX + 30
        a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
        if (pabbleX > bdWidth - a.offsetWidth) pabbleX = bdWidth - a.offsetWidth
    } else if (e.key === "ArrowLeft") {
        pabbleX = pabbleX - 30
        a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
        if (pabbleX < 0) pabbleX = 0

    }
})


/*
pabbleX = x + 10
letter.style.transform = `translateX(${x}px)`
*/
/*
if (A+(letterWidth/2) >= board.length) touche le mur
if (A <= 0 ) touche le mur 
*/