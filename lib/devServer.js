const fs = require('fs')
const path = require('path')
const glob = require('glob')

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

const fileWatchLookup = {}
io.on('connection', (socket) => {
  console.log('Connection received')
  const jsFiles = glob.sync('sketches/**/*.js')
  jsFiles.forEach(file => {
    if (fileWatchLookup[file]) return
    fs.watch(path.resolve(__dirname, '..', file), {}, () => {
      console.log('Files changed, triggering browser reload.')
      io.sockets.emit('reload')
    })
    fileWatchLookup[file] = true
  })
  socket.emit('init')
})


server.listen(port, () => {
  console.log('listening on', url)
})


