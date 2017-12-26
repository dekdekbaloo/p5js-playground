const sketchName = process.argv[2]
if (!sketchName) {
  console.error('Please provide a sketch name')
  process.exit(-1)
}
console.log('Starting development server for sketch:', sketchName)

const fs = require('fs')
const path = require('path')

const express = require('express')
const templateHtml = fs.readFileSync(path.resolve(__dirname, '../sketches', sketchName, 'index.html'), 'utf8')

const port = 3000
const url = 'http://localhost:' + port

const modifiedHtml = templateHtml.replace('</head>', 
`<script src="/socket.io/socket.io.js"></script>
<script>socketUrl='${url}'</script>
<script src='/lib/socket.client.js'></script>
</head>
`)

const app = express()

app.use('/scripts', express.static('sketches/scripts'))
app.use('/lib', express.static('lib'))
app.use(express.static(`sketches/${sketchName}`))
app.get('/', (req, res) => (
  res.send(modifiedHtml)
))
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('Connection received')
  fs.watch(path.resolve(__dirname, '../sketches/'), { recursive: true }, () => {
    console.log('Files changed, triggering browser reload.')
    socket.emit('reload')
  })
  socket.emit('init')
})


server.listen(port, () => {
  console.log('listening on', url)
})


