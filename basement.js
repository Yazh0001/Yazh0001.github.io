theButton = document.getElementById("b1")
theText = document.getElementById("txt")
min = document.getElementById("min")
max = document.getElementById("max")

theButton.onmouseover = function(){
    theButton.style.backgroundColor = "rgb(100, 100, 100)"
}

theButton.onmouseleave = function(){
    theButton.style.backgroundColor = "rgb(150, 150, 150)"
}

theButton.onmousedown = function(){
    s = parseInt(min.value)
    b = parseInt(max.value)
    theButton.style.backgroundColor = "rgb(170, 170, 170)"
    theText.innerHTML = Math.floor(Math.random()*(b-s + 1)) + s
    
}

theButton.onmouseup = function(){
    theButton.style.backgroundColor = "rgb(100, 100, 100)"
}


