require('dotenv').config();

module.exports = {
  // 数据库配置
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/drone-pharmacy'
  },
  
  // JWT配置
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    expiresIn: '24h'
  },
  
  // 服务器配置
  server: {
    port: process.env.PORT || 3001
  },
  
  // 百度地图配置
  baiduMap: {
    key: process.env.BAIDU_MAP_KEY
  },
  
  // 跨域配置
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
  },
  
  email: {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  },
  
  alertEmails: (process.env.ALERT_EMAILS || '').split(',')
}; 