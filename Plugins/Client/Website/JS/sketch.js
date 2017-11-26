// Run in a local function, same from window (global) variable acess!
(() => {
    // Safe From Outside Influence :)
    // Usefull for protecting from harmfull code and tampering with visuals to claim something. (Leaderboards)


    // Variables
    let PORT = 802
    let SERVER = "72.223.112.19"
    let draw = {
        player : [],
        blobs : [],
        alive : false
    }
    let server = {
        packets : undefined,
        clientId : undefined,
        initConnect : undefined,
        connected : false
    }
    let bfGameText = "Press play to Connect!"
    let gameVars = {
        width : 0,
        height : 0
    }

    //document.getElementById('overlay').style.top = (window.innerHeight - document.getElementById('overlay').clientHeight) /2
    //document.getElementById('overlay').style.length = (window.innerWidth - document.getElementById('overlay').clientWidth) /2

    document.getElementById('play').onclick = () => {
        bfGameText = "Connecting..."
    }

    let sketch = (p) => {
        let canvas;
        p.setup = () => {
            canvas = p.createCanvas(window.innerWidth - 20, window.innerHeight - 35);
        }
        window.onresize = function(event) {
            canvas.size(window.innerWidth - 20, window.innerHeight - 35);
            //document.getElementById('overlay').style.top = (window.innerHeight - document.getElementById('overlay').clientHeight) /2
            //document.getElementById('overlay').style.length = (window.innerWidth - document.getElementById('overlay').clientWidth) /2
        };
        p.draw = () => {
            p.background(0);
            if (server.connected){

            }else {
                p.fill(255, 255, 255);
                p.textSize(100);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(bfGameText, p.width / 2, p.height / 4);
            }

        }
    }
    let game = new p5(sketch);
})();
