function Pingpong (x, y, speed) {
  this.position = new p5.Vector(x, y)
  this.velocity = new p5.Vector(Math.random(), Math.random())
  this.velocity.setMag(speed)

  this.update = function () {
    this.position.add(this.velocity)
    // this.velocity.add(createVector(0, 1))
    if (this.position.x >= width || this.position.x <= 0) {
      if (this.position.x < 0) this.position.x = 0
      else this.position.x = width
      this.velocity.x *= -1
    }
    if (this.position.y >= height || this.position.y <= 0) {
      if (this.position.y < 0) this.position.y = 0
      else this.position.y = height
      this.velocity.y *= -1
    }
  }
  this.draw = function () {
    fill('green')
    ellipse(this.position.x, this.position.y, 10)
  }
  return this
}