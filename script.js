//let body = document.querySelector("body")
let a = document.getElementById("pabble")
let board = document.getElementById("board")
//let x = 0
let boardHeight = board.offsetHeight
let boardWidth = board.offsetWidth
let pabbleY = boardHeight - 50
let pabbleX = boardWidth / 2 - (a.offsetWidth) / 2
a.style.transform = `translate(${pabbleX}px, ${pabbleY}px)`
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        pabbleX = pabbleX + 20
        a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
        if (pabbleX > boardWidth - a.offsetWidth) pabbleX = boardWidth - a.offsetWidth
    } else if (e.key === "ArrowLeft") {
        pabbleX = pabbleX - 20
        a.style.transform = `translate(${pabbleX}px,  ${pabbleY}px)`
        if (pabbleX < 0) pabbleX = 0

    }
})


/*
pabbleX = x + 10
letter.style.transform = `translateX(${x}px)`
*/