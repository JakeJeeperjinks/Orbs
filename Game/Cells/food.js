class Food {
  constructor(color, mass, universalId, gameX, gameY) {
    this.color = color; // Food Color
    this.universalId = universal++; // Set universalId, used for commands.
    this.x = random(-gameX, gameX); // Random Spawn [X]
    this.y = random(-gameY, gameY); // Random Spawn [Y]
    this.mass = mass; // Mass
    this.radius = Math.round(Math.sqrt((mass * 100) / Math.PI)); // Radius from mass
    this.type = "food" // Cell type
  }
}
module.exports = Food
