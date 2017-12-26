function Segment(x, y, len, angle) {
  this.a = new p5.Vector(x, y)
  this.b = new p5.Vector(0, 0)
  this.len = len
  this.angle = angle

  this.updateB = function () {
    angleMode(DEGREES)
    let x = this.len * cos(this.angle) + this.a.x
    let y = this.len * sin(this.angle) + this.a.y
    this.b.x = x
    this.b.y = y
  }

  this.follow = function (x, y) {
    let dx = x - this.a.x
    let dy = y - this.a.y

    this.angle = atan2(dy, dx)
  }

  this.update = function () {
    this.updateB()
  }

  this.draw = function () {
    strokeWeight(4)
    stroke(255)
    line(this.a.x, this.a.y, this.b.x, this.b.y)
  }

  return this
}