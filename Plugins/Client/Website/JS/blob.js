function Blob(x, y, r, color) {
    this.pos = createVector(x, y);
    this.r = r;
    if (color){
        this.color = color;
    }else {
        this.color = [random(255), random(255), random(255)]
    }

    this.update = function() {
        if (mouseX <= (width/2 + 10) && mouseX >= (width/2 - 10) && mouseY <= (height/2 + 10) && mouseY >= (height/2 - 10)){
            //nothing
        }else {
            let vel = createVector(mouseX-width/2, mouseY-height/2);
            vel.setMag(3/(sqrt(this.r) / 32));
            this.pos.add(vel);
        }
        this.r -= (0.0025 * (sqrt(this.r)/ 1.5))

    }

    this.eats = function(other, newCell){
        let d = p5.Vector.dist(this.pos, other.pos);
        if (d < this.r + other.r){
            let sum = PI * this.r * this.r + PI * other.r * other.r;
            this.r = sqrt(sum / PI)
            if (newCell){
                let x = random(-width, width);
                let y = random(-height, height)
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
        textSize(this.r);
        textAlign(CENTER);
        text(this.mass(), this.pos.x, this.pos.y);
    }

    this.mass = function(){
        return Math.floor(sqrt(PI * this.r * this.r))
    }
}
