require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIO = require('./socket');
const config = require('./config/config');

const app = express();
const server = http.createServer(app);

// 初始化Socket.IO
const io = socketIO(server);

// 中间件
app.use(helmet());
app.use(cors(config.cors));
app.use(express.json());

// 数据库连接
mongoose.connect(config.mongodb.uri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// 路由
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/drones', require('./routes/droneRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/inventory', require('./routes/inventoryRoutes'));

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: '服务器错误' });
});

const PORT = config.server.port;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 