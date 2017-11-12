let blob;
let blobs = [];
let scroll = 0.5;
let zoom = 1;
let ejectedMass = [];
let EjectMe = 5;

function setup() {
    createCanvas(window.innerWidth - 20, window.innerHeight - 35);
    setFrameRate(240);
    blob = new Blob(0, 0, 64);
    for (let i=0; i< 500; i++){
        let x = random(-5000, 5000);
        let y = random(-5000, 5000)
        let R = random(32)
        blobs[i] = new Blob(x, y, R);
    }
    document.getElementById('fps').innerHTML = "FPS : " + Math.floor(frameRate());
    setInterval(() => {
        document.getElementById('fps').innerHTML = "FPS : " + Math.floor(frameRate());
    }, 100)
}

function mouseWheel(event) {
    if ((scroll + event.delta/1000) > 0 && (scroll + event.delta/500) <= 7){
        scroll += event.delta / 500;
    }
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

    if (keyIsDown(87)){
        if (EjectMe == 5){
            if (blob.r > 65){
                let arrayId = ejectedMass.length;
                ejectedMass[arrayId] = new Blob(blob.pos.x, blob.pos.y, 32, [blob.color[0], blob.color[1], blob.color[2]]);
                ejectedMass[arrayId].killable = false;
                ejectedMass[arrayId].projection = {
                    cont: 20 + sqrt(blob.r),
                    x : mouseX,
                    y : mouseY,
                    blobX : blob.pos.x,
                    blobY : blob.pos.y
                }
                let sum = PI * blob.r * blob.r - PI * ejectedMass[arrayId].r * ejectedMass[arrayId].r;
                blob.r = sqrt(sum / PI);
            }
            EjectMe = 0;
        }else {
            EjectMe++;
        }

    }

    translate(width/2, height/2);
    let newzoom = 64 / (blob.r * scroll);
    zoom = lerp(zoom, newzoom, 0.08)
    scale(zoom);
    translate(-blob.pos.x, -blob.pos.y)
    for (let i= blobs.length-1; i>=0;i--){
        blobs[i].show();
        if (blob.eats(blobs[i], true)){
            blobs.splice(i, 1);
        }
    }
    for (let ii= ejectedMass.length-1; ii>=0;ii--){
        if (ejectedMass[ii].projection.killable && blob.eats(ejectedMass[ii], false)){
            ejectedMass.splice(ii, 1);
        }else {
            if (ejectedMass[ii].projection.cont > 0){
                for (let iii=0; iii < 2; iii++){
                    let vel = createVector(ejectedMass[ii].projection.x-width/2, ejectedMass[ii].projection.y-height/2);
                    vel.setMag(3 + sqrt(blob.r));
                    ejectedMass[ii].pos.add(vel);
                    ejectedMass[ii].projection.cont--;
                }

            }else {
                ejectedMass[ii].projection.killable = true;
            }
            ejectedMass[ii].show();
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
