# 配置说明

## 环境变量

### 前端环境变量 (.env)

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_BAIDU_MAP_KEY=your-baidu-map-key
```

### 后端环境变量 (.env)

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/drone-pharmacy
JWT_SECRET=your-secret-key
FRONTEND_URL=http://localhost:3000
BAIDU_MAP_KEY=your-baidu-map-key

# 邮件配置
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
ALERT_EMAILS=admin1@example.com,admin2@example.com
```

## 部署配置

### PM2 配置 (ecosystem.config.js)

```javascript
module.exports = {
  apps: [{
    name: "drone-pharmacy-backend",
    script: "./backend/server.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production",
    }
  }]
}
```

### Nginx 配置

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # SSL 配置
    listen 443 ssl;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # 前端静态文件
    location / {
        root /var/www/drone-pharmacy/frontend/build;
        try_files $uri $uri/ /index.html;
        expires 30d;
    }

    # API 代理
    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # WebSocket 代理
    location /socket.io {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
``` 