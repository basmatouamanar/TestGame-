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