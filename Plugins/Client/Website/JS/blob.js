function Blob(x, y, r) {
    this.pos = createVector(x, y);
    this.r = r;

    this.update = function() {
        let vel = createVector(mouseX-width/2, mouseY-height/2);
        vel.setMag(3);
        this.pos.add(vel);
    }

    this.eats = function(other){
        let d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r){
            let sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI)
            return true;
        }else {
            return false;
        }
    }

    this.show = function() {
        fill(255);
        ellipse(this.pos.x, this.pos.y, this.r*2, this.r*2)
    }
}
