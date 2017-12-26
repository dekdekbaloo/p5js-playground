function CirculateTarget (x, y, radius, angularSpeed) {
  this.position = createVector(x, y)
  
  let origin = createVector(x, y)
  let currentAngle = 0


  this.setOrigin = function (x, y) {
    origin.x = x
    origin.y = y
  }

  this.update = function () {
    currentAngle += angularSpeed
    angleMode(DEGREES)
    this.position.x = origin.x + cos(currentAngle) * radius
    this.position.y = origin.y + sin(currentAngle) * radius
  }

  this.draw = function () {
    strokeWeight(0)
    fill('cyan')
    ellipse(this.position.x, this.position.y, 5)
  }


  return this
}
