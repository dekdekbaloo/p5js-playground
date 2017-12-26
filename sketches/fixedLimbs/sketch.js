let fixedLimbsList = []
let circularTarget

function setup () {
  createCanvas(windowWidth, windowHeight) 
  circularTarget = new CirculateTarget(width * 0.5, height * 0.5, 10, 25)
  let count = 36
  for (let i = 0; i < count; i++) {
    let currentAngle = i * 360 / count
    let a = width * 0.55
    let b = height * 0.55
    angleMode(DEGREES)
    let t = new p5.Vector(a * cos(currentAngle), b * sin(currentAngle))
    let origin = new p5.Vector(width * 0.5, height * 0.5)
    origin.add(t)
    fixedLimbsList.push(new FixedLimbs(origin.x, origin.y, 100, 5))
  }
}

function draw () {
  background(0)
  let origin = createVector(mouseX || width * 0.5, mouseY || height * 0.5)
  circularTarget.setOrigin(origin.x, origin.y)
  circularTarget.update()
  fixedLimbsList.forEach(l => {
    l.follow(circularTarget.position.x, circularTarget.position.y)
    l.update()
    l.draw()
  })
  circularTarget.draw()
}