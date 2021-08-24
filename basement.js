const boxelement = document.getElementById("box")
const output_text = document.getElementById("print")
const myscreen = document.getElementById("screen")

function print(x){output_text.innerHTML = x;}

var hovering = false;
var clicking = false;

var mousex = 0
var mousey = 0

window.addEventListener("mousemove", e=>{
    mousex = e.screenX 
    mousey = e.screenY 
})

var startx = 0
var starty = 0
var boxstartx = 0
var boxstarty = 0

class box {
    constructor(e){
        this.element = e
        this.x = 0
        this.y = 0
        this.width = 10
        this.height = 10
        
        this.xvel = 0
        this.yvel = 5
        this.xacc = 0
        this.yacc = 0.03
    }

    resize(width, height){
        this.width = width
        this.height = height
        this.element.style.width = this.width + "px"
        this.element.style.height = this.height + "px"
    }

    moveto(x, y){
        this.x = x
        this.element.style.left = x + "px";
        this.y = y
        this.element.style.top = y + "px";
        if(x + this.width > 1455 ){
            this.x = 1460 - this.width
            this.element.style.left = x + "px"
        }
        if(y + this.height > 495){
            this.y = 495 - this.height
            this.element.style.top = y + "px"
        }
    }

    move(){
        this.moveto(this.x + this.xvel, this.y + this.yvel)
    }

    accelerate(){
        this.xvel += this.xacc
        this.yvel += this.yacc
    }
}

mybox = new box(boxelement)

mybox.resize(200, 100)
mybox.moveto(45, 45)

setInterval(() => {
    mybox.element.addEventListener("mouseover", e =>{hovering = true})
    mybox.element.addEventListener("mouseleave", e=>{hovering = false})
    mybox.element.addEventListener("mousedown", e=>{
        if(hovering){
        clicking = true;
        startx = mousex;
        starty = mousey;
        boxstartx = mybox.x;
        boxstarty = mybox.y; 
        }
    })
    mybox.element.addEventListener("mouseup", e=>{
        if(hovering){
        clicking = false 
        }
    })
    if(clicking){
        mybox.moveto(boxstartx + (mousex - startx), boxstarty + (mousey - starty))
    }
    if(!clicking){
        mybox.move()
    }
    // mybox.accelerate()
}, 1);

