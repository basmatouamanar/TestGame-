//let body = document.querySelector("body")
let a = document.getElementById("letter")
let x = 0
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
        x = x + 10
        a.style.transform = `translateX(${x}px)`
    } else if (e.key === "ArrowLeft") {
        x = x - 10
        a.style.transform = `translateX(${x}px)`

    }
})


/*
x = x + 10
letter.style.transform = `translateX(${x}px)`
*/