function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
exports.create = function(name, mass, gameX, gameY, color){
    this.name = name;
    this.color = color;
    this.cells = [];
    this.cells[0] = {};
    this.cells[0].x = random(-gameX, gameX);
    this.cells[0].y = random(-gameY, gameY);
    this.cells[0].mass = mass;
}
