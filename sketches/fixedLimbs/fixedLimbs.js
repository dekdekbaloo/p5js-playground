function FixedLimbs(baseX, baseY, len, count) {
  let base = createVector(baseX, baseY)
  let segments = []
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
    diff.mult(0.1)
    segments.forEach(s => {
      s.a.add(diff)
      s.b.add(diff)
    })
  }

  this.draw = function () {
    segments.forEach((s, i) => s.draw(i * 1.5))
  }

  return this
}