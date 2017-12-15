function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
class Player {
  constructor(name, mass, gameX, gameY, color, id, universal){
    // Whole Player setup
    this.name = name; // Player Name
    this.color = color; // Player Color
    this.cells = []; // Initialize Cells
    this.id = id; // Set id, used for server to client communication.
    this.universalId = universal++; // Set universalId, used for commands.

    // Setup 'Main' Cell
    this.cells[0] = {}; // Initialize
    this.cells[0].x = random(-gameX, gameX); // Random Spawn [X]
    this.cells[0].y = random(-gameY, gameY); // Random Spawn [Y]
    this.cells[0].mass = mass; // Mass
    this.cells[0].radius = Math.round(Math.sqrt((mass * 100) / Math.PI)); // Radius from mass
    this.cells[0].type = "player" // Cell type
    this.cells[0].speedBoost = 1; // 1 = Default Speed. (Speed Boost is a multiplyer);
  }
}
module.exports = Player
