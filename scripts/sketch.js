let segments = [ ]
function setup () {
  createCanvas(640, 480)
  for (let i = 0; i < 5; i++) {
    let segment
    if (i === 0) {
      segment = new Segment(width * 0.5, height * 0.5, 100, 0)
    } else {
      segment = new Segment(segments[i - 1].b.x, segments[i - 1].b.y, 100, 0)
    }
    segments.push(segment)
  }
}

function draw () {
  segments.forEach((s, i) => {
    if (i === 0) s.follow(mouseX, mouseY)
    else {
      let lastSegment = segments[i - 1]
      s.follow(lastSegment.a.x, lastSegment.a.y)
    }
    s.update()
  })
  background(0)
  segments.forEach(s => s.draw())
}