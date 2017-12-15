// Logo :)
console.log('%c                                                                               ', 'background: #404040;color: #329932');
console.log('%c                                         bbbbbbbb                              ', 'background: #404040;color: #329932');
console.log('%c      OOOOOOOOO                          b::::::b                              ', 'background: #404040;color: #329932');
console.log('%c    OO:::::::::OO                        b::::::b                              ', 'background: #404040;color: #329932');
console.log('%c  OO:::::::::::::OO                      b::::::b                              ', 'background: #404040;color: #329932');
console.log('%c O:::::::OOO:::::::O                      b:::::b                              ', 'background: #404040;color: #329932');
console.log('%c O::::::O   O::::::O rrrrr   rrrrrrrrr    b:::::bbbbbbbbb         ssssssssss   ', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O r::::rrr:::::::::r   b::::::::::::::bb     ss::::::::::s  ', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O r:::::::::::::::::r  b::::::::::::::::b  ss:::::::::::::s ', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O rr::::::rrrrr::::::r b:::::bbbbb:::::::b s::::::ssss:::::s', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O  r:::::r     r:::::r b:::::b    b::::::b  s:::::s  ssssss ', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O  r:::::r     rrrrrrr b:::::b     b:::::b    s::::::s      ', 'background: #404040;color: #329932');
console.log('%c O:::::O     O:::::O  r:::::r             b:::::b     b:::::b       s::::::s   ', 'background: #404040;color: #329932');
console.log('%c O::::::O   O::::::O  r:::::r             b:::::b     b:::::b ssssss   s:::::s ', 'background: #404040;color: #329932');
console.log('%c O:::::::OOO:::::::O  r:::::r             b:::::bbbbbb::::::b s:::::ssss::::::s', 'background: #404040;color: #329932');
console.log('%c  OO:::::::::::::OO   r:::::r             b::::::::::::::::b  s::::::::::::::s ', 'background: #404040;color: #329932');
console.log('%c    OO:::::::::OO     r:::::r             b:::::::::::::::b    s:::::::::::ss  ', 'background: #404040;color: #329932');
console.log('%c      OOOOOOOOO       rrrrrrr             bbbbbbbbbbbbbbbb      sssssssssss    ', 'background: #404040;color: #329932');
console.log('%c                                                                               ', 'background: #404040;color: #329932');
console.log('%c                                                                               ', 'background: #404040;color: #329932');
console.log('%c                                                                               ', 'background: #404040;color: #329932');

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
    initEnd : false,
    connected : false,
    connecting : false,
    verified : false,
    gameData : {}
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

  let handlePacket = (e) => {
    let data = JSON.parse(e.data);
    if (data){
      if(data.reason == 'verify'){
        alertify.success('Game Started');
        server.connecting = false;
        server.connected = true;
      }else if (data.reason == 'game'){
        server.gameData = data.game;

      }
    }
  }

  alertify.maxLogItems(5);

  // Play Button
  document.getElementById('play').onclick = () => {
    document.getElementById('overlay').style.visibility = 'hidden';
    if (!server.joined){
      bfGameText = "Connecting...";
      server.connecting = true;
      clearInterval(particles.dirChanger);
      particles.system = {};
      if (server.verified){
        alertify.log('Connecting to Server...');
        server.initConnect = new WebSocket('ws://' + SERVER + '/join');
        server.initConnect.onopen = () => {
          alertify.success('Connected To Server, Joining Game...');
          bfGameText = 'Joining...'
          server.initConnect.send(JSON.stringify({
            newplayer: true,
            name: document.getElementById('name').value || 'Unnamed'
          }))
        }
        server.initConnect.onclose = () => {
          if (server.initEnd){
            server.packets = new WebSocket('ws://' + SERVER + '/player/' + server.clientId);
            server.packets.onopen = () => {
              alertify.success('Connected To Game');
              server.packets.send(JSON.stringify({
                init: true
              }))
            }
            server.packets.onclose = () => {
              alertify.error('Disconnected From Game');
            }
            server.packets.onmessage = handlePacket;
          }else {
            bfGameText = 'Disconnected'
            alertify.error('Disconnected From Server');
          }

        }
        server.initConnect.onmessage = (e) => {
          if (e.data){
            let data = JSON.parse(e.data);
            if (data.error){
              alertify.error('Error Joining : ' + data.reason);
            }else {
              if (data.reason == 'creating-player'){
                server.clientId = data.id;
                server.initEnd = true;
                server.initConnect.send(JSON.stringify({disconnect: true}));
                server.initConnect.close();
              }
            }
          }
        }
      }else {
        alertify.error('Server isnt verified to exist. Wait till verification or try a different server.')
      }
    }else {
      alertify.error('Already Joined. Refresh Page if this is a mistake.')
    }

  }

  let sketch = (p) => {
    let canvas;
    p.setup = () => {
      // Create Canvas
      canvas = p.createCanvas(window.innerWidth - 20, window.innerHeight - 35);

      // Set Menue Pos
      document.getElementById('overlay').style.top = (p.height / 2) - 20 - (359 / 2)
      document.getElementById('overlay').style.left = (p.width / 2) - 10 - (363 / 2)

      // Set Server
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

      // Set Frame Rate
      p.setFrameRate(240);

      // Set fps counter
      document.getElementById('fps').innerHTML = "FPS : " + Math.floor(p.frameRate());
      setInterval(() => {
        document.getElementById('fps').innerHTML = "FPS : " + Math.floor(p.frameRate());
      }, 500);


      // Start Particles
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
        p.ellipse(p.width / 2, p.height / 2, 50);
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
