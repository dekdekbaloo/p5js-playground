var socket = io.connect(window.socketUrl || 'http://localhost:3000')
socket.on('uhu', (data) => {
  console.log('received uhu:', data)
})