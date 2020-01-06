const server = require('http').createServer();
const io = require('socket.io')(server);

server.listen(8088);

io.on('connection', (socket) => {
  const { id } = socket;

  socket.broadcast.emit('join');

  socket.on('params', (params) => {
    const {
      x,
      y,
      xVelocity,
      yVelocity,
      power,
      reverse,
      angle,
      angularVelocity,
      isThrottling,
      isReversing,
      isTurningLeft,
      isTurningRight
    } = params;

    socket.broadcast.emit('params', {
      id,
      params: {
        x,
        y,
        xVelocity,
        yVelocity,
        power,
        reverse,
        angle,
        angularVelocity,
        isThrottling,
        isReversing,
        isTurningLeft,
        isTurningRight
      }
    });
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('leave', id);
  });
});
