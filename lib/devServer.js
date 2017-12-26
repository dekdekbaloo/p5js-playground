const fs = require('fs')
const path = require('path')

const express = require('express')

const port = 3000
const url = 'http://localhost:' + port

const app = express()

app.use('/shared', express.static('sketches/shared'))
app.use('/lib', express.static('lib'))

app.get('/:sketchName', (req, res) => {
  const { sketchName } = req.params
  const templateHtml = fs.readFileSync(path.resolve(__dirname, '../sketches', sketchName, 'index.html'), 'utf8')
  const modifiedHtml = templateHtml.replace('</head>',
    `<script src="/socket.io/socket.io.js"></script>
    <script>socketUrl='${url}'</script>
    <script src='/lib/socket.client.js'></script>
  </head>`)
  res.send(modifiedHtml)
})
app.get('/:sketchName/:file', (req, res) => {
  const { sketchName, file } = req.params
  res.sendFile(path.resolve(__dirname, '../sketches/', sketchName, file))
})
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


