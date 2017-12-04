// Run in a local function, same from window (global) variable acess!
(() => {
    // Safe From Outside Influence :)
    // Usefull for protecting from harmfull code and tampering with visuals to claim something. (Leaderboards)


    // Variables
    let SERVER = "";
    let draw = {
        player : [],
        blobs : [],
        alive : false
    }
    let server = {
        packets : undefined,
        clientId : undefined,
        initConnect : undefined,
        connected : false,
        connecting : false,
        verified : false
    }
    let bfGameText = "Press play to Connect"
    let gameVars = {
        width : 0,
        height : 0
    }

    let graphics = 4;

    let particles = {
        x: 0,
        y: 0,
        g: 0,
        dir: 0,
        dirChanger: setInterval(() => {
            if (particles.dir == 0){
                particles.dir = 1;
            }else {
                particles.dir = 0;
            }
        }, 4000)
    }

    document.getElementById('play').onclick = () => {
        bfGameText = "Connecting...";
        server.connecting = true;
        clearInterval(particles.dirChanger);
        particles.system = {};
    }

    let sketch = (p) => {
        let canvas;
        p.setup = () => {
            canvas = p.createCanvas(window.innerWidth - 20, window.innerHeight - 35);
            document.getElementById('overlay').style.top = (p.height / 2) - 20 - (359 / 2)
            document.getElementById('overlay').style.left = (p.width / 2) - 10 - (363 / 2)
            if (SERVER || SERVER == ""){
                let serv = prompt("Enter a server, or use default.", "Orbs");
                if (serv == 'Orbs'){
                    SERVER = '72.223.112.19:801';
                    bfGameText = "Press Play to Connect to Orbs"
                    document.getElementById('server').innerHTML = "Server : Orbs [❌]"
                    let verifyServer = new WebSocket('ws://' + SERVER);
                    verifyServer.onopen = () => {
                        server.verified = true;
                        document.getElementById('server').innerHTML = "Server : Orbs [✅]"
                    }
                }else {
                    SERVER = serv;
                    bfGameText = "Press Play to Connect to " + SERVER
                    document.getElementById('server').innerHTML = "Server : " + SERVER + " [❌] "
                    let verifyServer = new WebSocket('ws://' + SERVER);
                    verifyServer.onopen = () => {
                        server.verified = true;
                        document.getElementById('server').innerHTML = "Server : " + SERVER + " [✅] "
                    }
                }
            }else {
                bfGameText = "Press Play to Connect to " + SERVER
                document.getElementById('server').innerHTML = "Server : " + SERVER + " [✅] "
                let verifyServer = new WebSocket('ws://' + SERVER);
                verifyServer.onopen = () => {
                    server.verified = true;
                    document.getElementById('server').innerHTML = "Server : " + SERVER + " [✅] "
                }
            }
            p.setFrameRate(240);
            document.getElementById('fps').innerHTML = "FPS : " + Math.floor(p.frameRate());
            setInterval(() => {
                document.getElementById('fps').innerHTML = "FPS : " + Math.floor(p.frameRate());
            }, 500);
            particles.system = new ParticleSystem(p.createVector(p.width / 2, p.height / 2));

        }
        window.onresize = function(event) {
            canvas.size(window.innerWidth - 20, window.innerHeight - 35);
            document.getElementById('overlay').style.top = (p.height / 2) - 20 - (359 / 2)
            document.getElementById('overlay').style.left = (p.width / 2) - 10 - (363 / 2)
        };
        p.draw = () => {
            p.background(0);

            if (server.connected){

            }else {
                p.fill(255, 255, 255);
                p.textSize(60);
                p.textAlign(p.CENTER, p.CENTER);
                p.text(bfGameText, p.width / 2, (p.height / 6 ));
                if (server.verified){
                    p.fill(0, 255, 0);
                    p.text("Server Verified", p.width / 2, (p.height / 6 + 50));
                }else {
                    p.fill(255, 0, 0);
                    p.text("Server Not Verified", p.width / 2, p.height / 6 + 50);
                }
                if (!server.connecting){
                    particles.system.origin.x = particles.x;
                    particles.system.origin.y = particles.y;
                    particles.x = p.mouseX;
                    particles.y = p.mouseY;
                    if (graphics > 2){
                        particles.system.addParticle();
                        particles.system.run();
                    }
                }

            }

        }

        // Particles
        var Particle = function(position) {
          this.acceleration = p.createVector(0, 0.05);
          this.velocity = p.createVector(p.random(-1, 1), p.random(-1, 0));
          this.position = position.copy();
          this.lifespan = 255.0;
          this.color = {
              r: p.random(255),
              g: p.random(255),
              b: p.random(255)
          }
        };

        Particle.prototype.run = function() {
            if (graphics > 3){
                this.update();
            }else {
                if (particles.g > 1){
                    this.update();
                    particles.g = 0;
                }else {
                    particles.g++;
                }
            }
            this.display();
        };

        // Method to update position
        Particle.prototype.update = function(){
          this.velocity.add(this.acceleration);
          if (particles.dir == 0){
              this.position.add(this.velocity);
          }else {
              this.position.sub(this.velocity);
          }

          this.lifespan -= 2;
        };

        // Method to display
        Particle.prototype.display = function() {
          p.stroke(this.color.r,this.color.g,this.color.b, this.lifespan);
          p.strokeWeight(2);
          p.fill(this.color.r,this.color.g,this.color.b, this.lifespan);
          p.ellipse(this.position.x, this.position.y, 12, 12);
        };

        // Is the particle still useful?
        Particle.prototype.isDead = function(){
          if (this.lifespan < 0) {
            return true;
          } else {
            return false;
          }
        };

        var ParticleSystem = function(position) {
          this.origin = position.copy();
          this.particles = [];
        };

        ParticleSystem.prototype.addParticle = function() {
            if (graphics > 3){
                this.particles.push(new Particle(this.origin));
            }else {
                if (particles.g > 1){
                    this.particles.push(new Particle(this.origin));
                    particles.g = 0;
                }else {
                    particles.g++;
                }
            }
        };

        ParticleSystem.prototype.run = function() {
          for (var i = this.particles.length-1; i >= 0; i--) {
            var a = this.particles[i];
            a.run();
            if (a.isDead()) {
              this.particles.splice(i, 1);
            }
          }
        };
    }
    let game = new p5(sketch);


})();
