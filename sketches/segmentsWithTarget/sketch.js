let segmentsList = [ ]
let target

function SegmentsWithTarget (len, count) {
  this.segments = [ ]
  this.target = new Pingpong(Math.random() * width, Math.random() * height, 10)
  this.setup = function () {   
    for (let i = 0; i < count; i++) {
      let segment
      if (i === 0) {
        segment = new Segment(width * 0.5, height * 0.5, len, 0)
      } else {
        segment = new Segment(this.segments[i - 1].b.x, this.segments[i - 1].b.y, len, 0)
      }
      this.segments.push(segment)
    }
  }
  this.update = function () {
    this.target.update()
    this.segments.forEach((s, i) => {
      if (i === 0) s.follow(this.target.position.x, this.target.position.y)
      else {
        let lastSegment = this.segments[i - 1]
        s.follow(lastSegment.a.x, lastSegment.a.y)
      }
      s.update()
    })
  }
  this.draw = function () {
    this.segments.forEach((s, i) => s.draw((this.segments.length - i) * 1))
  }
  return this
}
function setup () {
  createCanvas(windowWidth, windowHeight)
  for (let i = 0; i < 20; i++) {
    let segmentsWithTarget = new SegmentsWithTarget(80, 10)
    segmentsWithTarget.setup()
    segmentsList.push(segmentsWithTarget)
  }
}
let selected = 5
function draw () { 
  background(0)

  segmentsList.forEach(ss => {
    ss.update()
    ss.draw()
  })
}