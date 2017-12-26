let segments = [ ]
function setup () {
  createCanvas(displayWidth, displayHeight)
  let len = 100
  for (let i = 0; i < 5; i++) {
    let segment
    if (i === 0) {
      segment = new Segment(width * 0.5, 0, len, 0)
    } else {
      segment = new Segment(segments[i - 1].b.x, segments[i - 1].b.y, len, (360 / 30) * i)
    }
    segments.push(segment)
  }
}
let selected = 5
function draw () {
  segments.forEach((s, i) => {
    if (i === 0) s.follow(mouseX, mouseY)
    else {
      let lastSegment = segments[i - 1]
      s.follow(lastSegment.a.x, lastSegment.a.y)
    }
  })
  background(0)
  segments.forEach(s => {
    s.update()
    s.draw()
  })
}