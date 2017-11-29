exports = (blob, mouseX, mouseY, width, height) => {
    let vel = new vector(mouseX-(width/2), mouseY-(height/2));
    vel.setMag(3/(sqrt(blob.radius) / 32));
    blob.x += vel.x;
    blob.y += vel.y;
    return blob
}
