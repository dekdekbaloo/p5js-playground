let segment
function setup () {
  createCanvas(640, 480)
  segment = new Segment(width * 0.5, height * 0.5, 100, 0)
}

function draw () {
  segment.follow(mouseX, mouseY)
  segment.update()

  background(0)
  segment.draw()

}