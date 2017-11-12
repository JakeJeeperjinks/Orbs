let blob;
let blobs = [];
let scroll = 0.5;

function setup() {
    createCanvas(window.innerWidth - 20, window.innerHeight - 35);
    blob = new Blob(0, 0, 64);
    for (let i=0; i< 100; i++){
        let x = random(-width, width);
        let y = random(-height, height)
        blobs[i] = new Blob(x, y, 16);
    }
}

function mouseWheel(event) {
  scroll += event.delta / 500;
}

function keyPressed() {
  if (keyCode == ESCAPE) {
    if (document.getElementById('overlay').style.visibility == "visible"){
        document.getElementById('overlay').style.visibility = "hidden";
    }else {
        document.getElementById('overlay').style.visibility = "visible";
    }
  }
}

function draw() {
    background(0);
    translate(width/2, height/2);
    scale(64 / (blob.r * scroll));
    translate(-blob.pos.x, -blob.pos.y)
    for (let i= blobs.length-1; i>=0;i--){
        blobs[i].show();
        if (blob.eats(blobs[i])){
            blobs.splice(i, 1);
        }
    }
    blob.show();
    blob.update();
}


let previousWidth = window.innerWidth;
let previousHeight = window.innerHeight;

setInterval(() => {
    if (previousWidth != window.innerWidth || previousHeight != window.innerHeight){
        alertify.error("Screen Size Has changed, this may result in your game feild being altered.");
        previousWidth = window.innerWidth;
        previousHeight = window.innerHeight;
    }
}, 100)
