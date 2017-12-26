function FixedLimbs (baseX, baseY, len, count) {
  let base = createVector(baseX, baseY)
  let segments = [ ]
  for (let i = 0; i < count; i++) {
    let segment
    if (i === 0) segment = new Segment(base.x, base.y, len, 0)
    else segment = new Segment(segments[i - 1].b.x, segments[i - 1].b.y, len, 0)
    segments.push(segment)
  }
  this.follow = function (x, y) {
    segments[0].follow(x, y)
  }
  this.update = function () {
    segments.forEach((s, i) => { 
      if (i) {
        let lastSegment = segments[i - 1]
        s.follow(lastSegment.a.x, lastSegment.a.y)
      }
      s.update() 
    })
    let lastSegment = segments[count - 1]
    let diff = p5.Vector.sub(base, lastSegment.a)  
    // console.log(diff)
    segments.forEach(s => { 
      s.a.add(diff)
      s.b.add(diff)
    })
  }

  this.draw = function () {
    segments.forEach(s => s.draw())
  }

  return this
}
let fixedLimbsList = []
function setup () {
  createCanvas(windowWidth, windowHeight) 
  for (let i = 0; i < 8; i++) {
    let currentAngle = i * 360 / 8
    let a = width * 2
    let b = height * 2
    angleMode(DEGREES)
    let t = new p5.Vector(a * cos(currentAngle), b * sin(currentAngle))
    if (abs(t.x) > width * 0.5) {
      t.x = width * 0.5 * (t.x / abs(t.x))
    }
    if (abs(t.y) > height * 0.5) {
      t.y = height * 0.5 * (t.y / abs(t.y))
    }
    let origin = new p5.Vector(width * 0.5, height * 0.5)
    origin.add(t)
    fixedLimbsList.push(new FixedLimbs(origin.x, origin.y, 150, 5))
  }
}

function draw () {
  background(0)
  fixedLimbsList.forEach(l => {
    l.follow(mouseX, mouseY)
    l.update()
    l.draw()
  })
}