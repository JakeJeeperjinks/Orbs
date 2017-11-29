function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
exports = function(name, mass, gameX, gameY, color, id, universal){
    // Whole Player setup
    this.name = name;
    this.color = color;
    this.cells = [];
    this.id = id;
    this.universalId = universal++;

    // Setup 'Main' Cell
    this.cells[0] = {};
    this.cells[0].x = random(-gameX, gameX);
    this.cells[0].y = random(-gameY, gameY);
    this.cells[0].mass = mass;
    this.cells[0].radius = Math.round(Math.sqrt((mass * 100) / Math.PI));
    this.cells[0].type = "player"
    this.cells[0].speedBoost = 1; // 1 = Default Speed. (Speed Boost is a multiplyer);
}
