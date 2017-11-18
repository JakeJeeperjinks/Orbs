// Change for different Server and Port
let SERVER = '72.223.112.19';
let PORT = '801' // Default port game will run on

let blob = [];
let blobs = [];
let scroll = 0.5;
let zoom = 1;
let ejectedMass = [];
let drawing = false;
let bfGameText = 'Press Play to Connect!';
let initConnect;
let clientId;
let packets;
let borders = [false, false, false, false]

function play() {
    let name = document.getElementById('name').value;
    if (name.length > 15){
        alertify.parent(document.body);
        alertify.alert('Names must be less than 15 characters!');
        return false;
    }else{
        bfGameText = 'Connecting...';
        initConnect = new WebSocket('ws://' + SERVER + ':' + PORT + '/new');
        initConnect.onmessage = (e) => {
            let data = JSON.parse(e.data);
            blob[0] = new Blob(0, 0, data.blob.mass, data.blob.color, data.blob.name);
            clientId = data.id;
            packets = new WebSocket('ws:/' + SERVER + ':' + PORT + '/player/' + clientId);

            packets.onmessage = (e) => {
                handlePacket(e);
            }

            packets.onopen = (e) => {
                setInterval(() => {
                    packets.send(JSON.stringify({
                        type: 'request',
                        request: 'blob',
                        id: clientId
                    }));
                    packets.send(JSON.stringify({
                        type: 'request',
                        request: 'blobs',
                        id: clientId
                    }));
                }, 1);
                drawing = true;
            }
            document.getElementById('overlay').style.visibility = "hidden";
            console.log('Client Connected to Server!');
        }
        initConnect.onopen = (e) => {
            initConnect.send(JSON.stringify({
                name : document.getElementById('name').value || 'Unnamed Cell'
            }))
        }

    }
}

function handlePacket(e) {
    console.log('Packet');
    let DATA = JSON.parse(e.data);
    if (DATA.type == 'blob-data'){
        //blob[0].pos.x = DATA.data.blob.x;
        //blob[0].pos.y = DATA.data.blob.y;
    }else if (DATA.type == 'blobs-data'){
        blobs = [];
        for (let i=0; i < DATA.data.blobs.length; i++) {
            blobs[i] = new Blob(DATA.data.blobs[i].x, DATA.data.blobs[i].y, DATA.data.blobs[i].mass, DATA.data.blobs[i].color, '');
        }
    }
}

function constructPacket(TYPE, SOCKET, DATA){
    if (TYPE == 'mouse'){
        SOCKET.send(JSON.stringify({
            type: 'mouse',
            mouse: {
                x: DATA.x,
                y: DATA.y
            },
            id: clientId,
            width: width,
            height: height
        }));
        return true
    }else {
        return false
    }
}

function setup() {
    createCanvas(window.innerWidth - 20, window.innerHeight - 35);
    setFrameRate(240);

    //blob[0].name = "Player";
    /* for (let i=0; i< 500; i++){
        let x = random(-worldX, worldX);
        let y = random(-worldY, worldY)
        let R = random(32)
        blobs[i] = new Blob(x, y, R);
        blobs[i].name = "Food";
    } */
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
    if (drawing) {
        noStroke();

        translate(width/2, height/2);
        let newzoom = 64 / (blob[0].r * scroll);
        zoom = lerp(zoom, newzoom, 0.08)
        scale(zoom);
        translate(-blob[0].x, -blob[0].y)
        if (keyIsDown(87)){
            // Send Server W
        }
        for (let i= blobs.length-1; i>=0;i--){
            blobs[i].show();
        }

        blob[0].show();
        strokeWeight(20)
        stroke(153);
        if (borders[0]){
            line(borders[0].x, -borders[0].y, -borders[0].x, -borders[0].y);
        }
        if (borders[1]){
            line(borders[1].x, borders[1].y, -borders[1].x, borders[1].y);
        }
        if (borders[2]){
            line(borders[2].x, borders[2].y, borders[2].x, -borders[2].y);
        }
        if (borders[3]){
            line(-borders[3].x, borders[3].y, -borders[3].x, -borders[3].y);
        }

        let mousePacket = constructPacket('mouse', packets, {x: mouseX, y: mouseY});

        if(!mousePacket){
            alertify.error("FATAL ERROR! Mouse Packet Failed to Send! :(");
        }

    }else {
        fill(255, 255, 255)
        textSize(100);
        textAlign(CENTER, CENTER);
        text(bfGameText, width / 2, height / 4)
    }

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
