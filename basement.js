const boxelement = document.getElementById("box")
const output_text = document.getElementById("print")
const myscreen = document.getElementById("screen")

function print(x){output_text.innerHTML = x;}

const gravity = 0.3

const screenh = 500
const screenw = 500

var hovering = false;
var clicking = false;

var mousex = 0
var mousexvel = 0
var mouseyvel = 0
var mousey = 0

window.addEventListener("mousemove", e=>{
    mousexvel = e.screenX - mousex
    mouseyvel = e.screenY - mousey
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
        this.yvel = 0
        this.xacc = 0
        this.yacc = gravity
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
        if(x + this.width > screenw ){
            clicking = false
            this.xvel = - this.xvel/2
            this.x = screenw - this.width
            this.element.style.left = x + "px"
        }
        if(y + this.height > screenh){
            clicking = false
            mybox.yacc = gravity
            if (this.xvel > 0){this.xvel = this.xvel - 0.01}
            if (this.xvel < 0){this.xvel = this.xvel + 0.01}
            this.y = screenh - this.height
            this.yvel = -this.yvel/1.3
            this.element.style.top = y + "px"
        }
        if(x < 0){
            clicking = false
            this.xvel = - this.xvel/2
            this.x = 0
            this.element.style.left = x + "px"
        }
        if(y < 0){
            clicking = false
            this.yvel = 0
            this.y = 0
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

mybox.resize(100, 100)
mybox.moveto(200, 0)

setInterval(() => {
    mybox.element.addEventListener("mouseover", e =>{hovering = true})
    mybox.element.addEventListener("mouseleave", e=>{hovering = false})
    mybox.element.addEventListener("mousedown", e=>{
        if(hovering){
        mybox.yacc = 0
        mybox.xvel = 0
        mybox.yvel = 0
        clicking = true
        startx = mousex
        starty = mousey
        boxstartx = mybox.x
        boxstarty = mybox.y
        }
    })
    mybox.element.addEventListener("mouseup", e=>{
        if(hovering){
        clicking = false
        mybox.xvel = Math.floor(mousexvel/3)
        mybox.yvel = Math.floor(mouseyvel/2)
        mybox.yacc = gravity
        }
    })
    if(clicking){
        var newx = boxstartx + (mousex - startx)
        var newy = boxstarty + (mousey - starty)
        
        mybox.moveto(newx, newy)
        
    }
    else{
        mybox.move()
    }
    // print("Bouncy Box")
    mybox.accelerate()
}, 1);

