const socketIO = require('socket.io');
const DroneMonitorService = require('./services/droneMonitorService');

module.exports = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      methods: ['GET', 'POST']
    }
  });

  const droneMonitor = new DroneMonitorService(io);

  io.on('connection', (socket) => {
    console.log('Client connected');

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // 初始化无人机监控
  droneMonitor.initializeMonitoring();

  return io;
}; 