function Blob(x, y, mass, color, name) {
  this.pos = createVector(x, y);
  this.r = sqrt((mass * 100) / PI);
  this.name = name;
  this.color = color;

  this.update = function() {
    if (this.pos.x < worldX && this.pos.x > -worldX && this.pos.y < worldY && this.pos.y > -worldY){
      if (mouseX <= (width/2 + 10) && mouseX >= (width/2 - 10) && mouseY <= (height/2 + 10) && mouseY >= (height/2 - 10)){
        //nothing
      }else {
        let vel = createVector(mouseX-width/2, mouseY-height/2);
        vel.setMag(3/(sqrt(this.r) / 32));
        this.pos.add(vel);
      }
      this.r -= (0.0025 * (sqrt(this.r)/ 1.5))
    }else {
      if (!(this.pos.x < worldX)) {
        this.pos.x--;
      }else if (!(this.pos.x > -worldX)){
        this.pos.x++;
      }
      if (!(this.pos.y < -worldY)){
        this.pos.y--;
      }else if (!(this.pos.y > worldY)){
        this.pos.y++;
      }
    }


  }

  this.eats = function(other, newCell){
    let d = p5.Vector.dist(this.pos, other.pos);
    if (d < this.r + other.r && this.mass() > (other.mass() + (other.mass() / 100))){
      let sum = PI * this.r * this.r + PI * other.r * other.r;
      this.r = sqrt(sum / PI)
      if (newCell){
        let x = random(-worldX, worldX);
        let y = random(-worldY, worldY);
        let R = random(50)
        blobs[blobs.length] = new Blob(x, y, R);
      }

      return true;
    }else {
      return false;
    }
  }

  this.show = function() {
    fill(this.color[0], this.color[1], this.color[2], 127);
    ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2);
    textSize(this.r/1.5);
    textAlign(CENTER, CENTER);
    text(this.mass(), this.pos.x, this.pos.y + this.r/2);
    text(this.name || "", this.pos.x, this.pos.y - (this.r/15));
  }

  this.mass = function(){
    return Math.floor((PI * this.r * this.r) / 100)
  }

  this.setMass = function(mass){
    this.r = sqrt((mass * 100) / PI)
  }
}
