const fs = require('fs')
const path = require('path')

const express = require('express')
const templateHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')

const port = 3000
const url = 'http://localhost:' + port

const modifiedHtml = templateHtml.replace('</head>', 
`<script src="/socket.io/socket.io.js"></script>
<script>socketUrl='${url}'</script>
<script src='/lib/socket.client.js'></script>
</head>
`)

const app = express()
app.use('/scripts', express.static('scripts'))
app.use('/lib', express.static('lib'))
app.get('/', (req, res) => (
  res.send(modifiedHtml)
))
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  console.log('Connection received')
  fs.watch(path.resolve(__dirname, '../scripts/'), { recursive: true }, () => {
    console.log('Files changed, triggering browser reload.')
    socket.emit('reload')
  })
  socket.emit('init')
})


server.listen(port, () => {
  console.log('listening on', url)
})


