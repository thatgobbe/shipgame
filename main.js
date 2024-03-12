/*
document.body.innerHTML += '<div id="star">*</div>'
var d = document.getElementById("star")
            //  .getElementsByTagName("p")[0]
d.style.top = Math.random()*innerHeight+"px";
var k = 0;
function slide(){
    d.style.position="absolute";
    k += 1;
    d.style.left = k+"px";
    requestAnimationFrame(slide);
}
slide();
*/
document.body.innerHTML += '<style>#ship{width: 10px;height: 10px;transform: rotate(90deg);}</style>';
document.body.innerHTML = document.querySelector('body').innerHTML + '<img id="ship" src="https://e7.pngegg.com/pngimages/184/724/png-clipart-arrow-button-right-triangle-angle-rectangle-thumbnail.png"></img>';
s = document.getElementById('ship');

var a=xv=x=yv=y=45;
var f = 0.99;
var v = 5;
s.style.position="absolute";

// setup keyboard
let keyboard = new Set();
window.addEventListener('keydown', function (e) {keyboard.add(e.key)})
window.addEventListener('keyup', function (e) {keyboard.delete(e.key)})

var now=then=delta=0;
function input(){
    if(keyboard.has("ArrowLeft")){
        a = (a-10)%360;
    }
    if(keyboard.has("ArrowRight")){
        a = (a+10)%360;
    }
    if(keyboard.has("ArrowUp")){
        gv=0;
        xv += Math.cos(a*Math.PI/180)*v;
        yv += Math.sin(a*Math.PI/180)*v;
    }
    if(keyboard.has("ArrowDown")){
        xv -= Math.cos(a*Math.PI/180)*v;
        yv -= Math.sin(a*Math.PI/180)*v;
    }
    xv = xv * f;
    yv = yv * f;
}
function noWalls(){
    // screen teleport
    if(x<0){
        x+=outerWidth;
    }
    if(y<0){
        y+=outerHeight;
    }
    x = (x+xv/5)%outerWidth;
    y = (y+yv/5)%outerHeight;
}

function bouncyWalls(){
    // bouncy screen walls
    if(x<0||x>innerWidth){
        xv=-xv;
    }
    if(y<0||y>innerHeight){
        yv=-yv;
    }
    x += xv/5;
    y += yv/5;
}

function game() {
    now = Date.now();
    delta = now-then;
    if(delta > 30){
        then = Date.now();
        input();
    }
    bouncyWalls()
    
    s.style.transform = "rotate(" + a + "deg)";
    s.style.left = x+"px";
    s.style.top = y+"px";
    requestAnimationFrame(game);
}
game();
