const fs = require('fs')
const path = require('path')

const express = require('express')
const ejs = require('ejs')
const templateHtml = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8')
const socketClientScript = fs.readFileSync(path.resolve(__dirname, 'socket.client.js'), 'utf8')

const port = 3000
const url = 'http://localhost:' + port

const modifiedHtml = templateHtml.replace('</head>', 
`<script src="/socket.io/socket.io.js"></script>
<script>socketUrl='${url}'</script>
<script>
${socketClientScript}
</script>
</head>
`)

const app = express()
app.use('/scripts', express.static('scripts'))
app.get('/', (req, res) => (
  res.send(modifiedHtml)
))
const server = require('http').Server(app)
const io = require('socket.io')(server)
io.on('connection', (socket) => {
  socket.emit('uhu', { uhu: 'yep' })
})


server.listen(port, () => {
  console.log('listening on', url)
})


