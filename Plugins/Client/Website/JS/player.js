function Player(name, color) {
  this.blobs = [];
  this.name = name;
  this.color = color;
  this.mass = function() {
    let m = 0;
    for (let i=0; i<blobs.length; i++){
      m += blobs[i].mass || 0
    }
    return m;
  }
}
