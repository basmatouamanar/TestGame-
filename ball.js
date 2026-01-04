
//let body = document.querySelector("body")
let a = document.getElementById("pabble")
let b = document.getElementById("board")
//let x = 0
let bHeight = b.offsetHeight
let bdWidth = b.offsetWidth
let aHeight = a.offsetHeight
let aWidth = a.offsetWidth

let pabbleY = bHeight - 50
let pabbleX = bdWidth / 2 - (a.offsetWidth) / 2

let ballLaunched = false

a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`

let keyword = {
    left: false,
    right: false
}

document.addEventListener("keydown", (e) => {
    if (e.code === 'Space') {
        ballLaunched = true
        dx = Math.random() * 4 - 2; // dx entre -2 et 2
        dy = 5; // toujours vers le haut   
    }
    if (e.key === "ArrowRight") {
        keyword.right = true

    } else if (e.key === "ArrowLeft") {
        keyword.left = true

    }
})
document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowRight") {
        keyword.right = false
    }
    if (e.key === "ArrowLeft") {
        keyword.left = false
    }
})

function movePabble() {
    if (keyword.right) {
        pabbleX = pabbleX + 5
    }
    if (keyword.left) {
        pabbleX = pabbleX - 5
    }
    if (pabbleX > bdWidth - a.offsetWidth) pabbleX = bdWidth - a.offsetWidth
    if (pabbleX < 0) pabbleX = 0
    a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
}

let element = document.getElementById("balle")
let board = document.getElementById("board")
let boardWidth = board.offsetWidth
let boardHeight = board.offsetHeight
let letterWidth = element.offsetWidth
let letterHeight = element.offsetHeight

let x = pabbleX + (aWidth / 2) - (letterWidth / 2)
let y = pabbleY - letterHeight
// element.style.transform = `translate(${x}px, ${y}px)`
let dx = 5
let dy = 5



function ball() {
    x = x + dx
    y = y + dy
    if (x <= 0 || (x + letterWidth) >= boardWidth) {
        dx = -dx
    }
    /* if ((y + letterHeight) >= boardHeight) {
         y = boardHeight - letterHeight
         return 
     }*/
    if (y <= 0 || (y + letterHeight) >= boardHeight) {
        dy = -dy
    }
    //let ydown = y + letterHeight  
    let ydown = y
    if (ydown >= pabbleY && y <= pabbleY + aHeight && x + letterWidth >= pabbleX && x <= pabbleX + aWidth) {
        dy = -dy

        let contact = (x + letterWidth / 2 - pabbleX) / aWidth
        let maxDX = 5
        dx = (contact - 0.5) * 2 * maxDX
    }

}

function loop() {
    movePabble()

    if (!ballLaunched) {
        x = pabbleX + (aWidth / 2) - (letterWidth / 2)
        y = pabbleY - letterHeight
    } else {
        ball()
    }

    element.style.transform = `translate(${x}px, ${y}px)`
    requestAnimationFrame(loop)
}

requestAnimationFrame(loop)








/*
requestAnimationFrame(loop)

loop():
    movePabble()

    if balle NON lancée:
        coller la balle à la raquette
    else:
        faire bouger la balle (dx / dy)

    draw()

*/