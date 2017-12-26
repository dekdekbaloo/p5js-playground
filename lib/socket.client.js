var socket = io.connect(window.socketUrl || 'http://localhost:3000')
function _log (...args) {
  console.log('[devServer]', ...args)
}
socket.on('init', (data) => {
  _log('Connected to devServer successfully.')
})
socket.on('reload', (data) => {
  _log('Received reload signal, reloading...')
  window.location.reload()
})