# 无人机药房配送系统操作手册

## 目录

1. [系统概述](#1-系统概述)
2. [环境配置](#2-环境配置)
3. [部署指南](#3-部署指南)
4. [系统配置](#4-系统配置)
5. [运维指南](#5-运维指南)
6. [故障处理](#6-故障处理)
7. [安全规范](#7-安全规范)

## 1. 系统概述

### 1.1 系统架构
- 前端：React + TypeScript + Ant Design
- 后端：Node.js + Express + MongoDB
- 实时通信：Socket.IO
- 地图服务：百度地图 GL API

### 1.2 核心功能
- 无人机实时监控
- 紧急订单处理
- 智能路径规划
- 库存预警系统
- 配送状态追踪

## 2. 环境配置

### 2.1 系统要求
- Node.js >= 16.x
- MongoDB >= 5.0
- Nginx >= 1.18
- PM2 >= 5.x

### 2.2 开发环境配置
```bash
# 安装开发工具
npm install -g typescript ts-node nodemon

# 克隆项目
git clone https://github.com/yourusername/drone-pharmacy.git
cd drone-pharmacy

# 安装依赖
cd frontend && npm install
cd ../backend && npm install
```

### 2.3 环境变量配置

#### 前端环境变量 (.env)
```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_SOCKET_URL=http://localhost:3001
REACT_APP_BAIDU_MAP_KEY=your-baidu-map-key
```

#### 后端环境变量 (.env)
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

## 3. 部署指南

### 3.1 开发环境部署
```bash
# 启动前端开发服务器
cd frontend
npm start

# 启动后端开发服务器
cd backend
npm run dev
```

### 3.2 生产环境部署

#### 3.2.1 前端部署
```bash
cd frontend
npm run build

# 配置 Nginx
sudo vim /etc/nginx/sites-available/drone-pharmacy
```

#### 3.2.2 Nginx 配置
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

#### 3.2.3 后端部署
```bash
cd backend

# PM2 配置文件
cat > ecosystem.config.js << EOL
module.exports = {
  apps: [{
    name: "drone-pharmacy-backend",
    script: "./server.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "production"
    }
  }]
}
EOL

# 启动服务
pm2 start ecosystem.config.js
```

### 3.3 数据库配置

#### 3.3.1 MongoDB 安装
```bash
# Ubuntu/Debian
sudo apt-get install mongodb

# 启动服务
sudo systemctl start mongodb
```

#### 3.3.2 数据库备份
```bash
# 创建备份脚本
cat > backup.sh << EOL
#!/bin/bash
BACKUP_DIR="/var/backups/mongodb"
DATE=$(date +%Y%m%d_%H%M%S)
mongodump --out $BACKUP_DIR/$DATE
find $BACKUP_DIR -mtime +7 -delete
EOL

# 添加定时任务
crontab -e
0 2 * * * /path/to/backup.sh
```

## 4. 系统配置

### 4.1 无人机配置
- 最大飞行距离：10km
- 最大载重：5kg
- 电池警戒值：30%
- 最大速度：60km/h

### 4.2 订单优先级
1. 紧急医疗订单
2. 处方药订单
3. 普通订单

### 4.3 库存预警设置
- 紧急药品库存警戒线：30%
- 普通药品库存警戒线：20%
- 预警通知方式：邮件、系统通知

## 5. 运维指南

### 5.1 日常维护
```bash
# 日志检查
pm2 logs

# 性能监控
pm2 monit

# 服务状态检查
pm2 status
```

### 5.2 数据备份
```bash
# 手动备份
mongodump --out /backup/$(date +%Y%m%d)

# 还原数据
mongorestore /backup/20240101
```

### 5.3 系统监控
- CPU 使用率阈值：80%
- 内存使用率阈值：85%
- 磁盘使用率阈值：90%

## 6. 故障处理

### 6.1 常见问题

#### 无人机离线
1. 检查电池电量
2. 验证网络连接
3. 检查控制信号

#### 订单异常
1. 检查数据库连接
2. 验证订单状态
3. 检查支付系统

#### 系统性能问题
1. 检查服务器负载
2. 优化数据库查询
3. 清理日志文件

### 6.2 紧急联系方式
- 技术支持：support@example.com
- 运维电话：+86-xxx-xxxx-xxxx
- 值班人员：[内部链接]

## 7. 安全规范

### 7.1 访问控制
- 使用 JWT 进行身份验证
- 实施 RBAC 权限管理
- 定期更新密码

### 7.2 数据安全
- 敏感数据加密存储
- 定期数据备份
- 访问日志审计

### 7.3 网络安全
- 启用 HTTPS
- 配置防火墙规则
- 定期安全扫描

## 附录

### A. 命令速查表
```bash
# 启动服务
npm start                 # 开发环境
pm2 start ecosystem.config.js  # 生产环境

# 查看日志
pm2 logs                  # 实时日志
tail -f /var/log/nginx/error.log  # Nginx错误日志

# 服务控制
pm2 restart all          # 重启所有服务
pm2 reload all           # 零停机重载
pm2 delete all           # 停止并删除所有服务
```

### B. 故障排查清单
1. 检查服务状态
2. 查看错误日志
3. 验证数据库连接
4. 检查网络连接
5. 验证配置文件

### C. 性能优化建议
1. 启用 Nginx 缓存
2. 优化数据库索引
3. 使用 Redis 缓存
4. 开启 Gzip 压缩
5. 实施 CDN 加速 

## API 接口配置

### 必需配置的第三方接口

#### 1. 百度地图API
```typescript
// frontend/src/services/map.ts
export const BAIDU_MAP_KEY = 'your-baidu-map-key';  // 替换为您的百度地图API密钥
export const BAIDU_MAP_VERSION = '3.0';  // 百度地图GL版本
```

配置说明：
- 申请地址：https://lbsyun.baidu.com/
- 所需权限：
  * 地图显示
  * 路径规划
  * 地理编码
  * 轨迹服务

#### 2. 天气API
```typescript
// frontend/src/services/weather.ts
export const WEATHER_API_KEY = 'your-weather-api-key';  // 替换为您的天气API密钥
export const WEATHER_API_URL = 'https://api.weather.com';  // 替换为实际的天气API地址
```

用于：
- 无人机飞行天气评估
- 路径规划天气因素考虑
- 配送时间预估

#### 3. 短信服务API
```typescript
// backend/services/sms.ts
export const SMS_ACCESS_KEY = 'your-sms-key';  // 替换为您的短信服务密钥
export const SMS_SECRET = 'your-sms-secret';  // 替换为您的短信服务密钥
```

用于：
- 配送状态通知
- 紧急订单确认
- 取件码发送

### 系统核心接口

#### 1. 无人机控制接口
```typescript
// backend/services/droneControl.ts
interface DroneControlAPI {
  // 无人机起飞
  takeOff(droneId: string): Promise<boolean>;
  
  // 无人机降落
  land(droneId: string, location: Location): Promise<boolean>;
  
  // 无人机返航
  returnToHome(droneId: string): Promise<boolean>;
  
  // 无人机状态监控
  monitorStatus(droneId: string): Promise<DroneStatus>;
}
```

#### 2. 路径规划接口
```typescript
// backend/services/routePlanning.ts
interface RoutePlanningAPI {
  // 最优路径计算
  calculateOptimalRoute(start: Location, end: Location, constraints: RouteConstraints): Promise<Route>;
  
  // 动态路径调整
  adjustRoute(currentRoute: Route, newConstraints: RouteConstraints): Promise<Route>;
  
  // 多机协同路径规划
  planMultiDroneRoutes(orders: Order[], availableDrones: Drone[]): Promise<DroneAssignment[]>;
}
```

#### 3. 订单处理接口
```typescript
// backend/services/orderProcessing.ts
interface OrderProcessingAPI {
  // 订单优先级评估
  evaluateOrderPriority(order: Order): Promise<number>;
  
  // 配送能力评估
  evaluateDeliveryCapability(order: Order, availableDrones: Drone[]): Promise<boolean>;
  
  // 订单分配优化
  optimizeOrderAssignment(orders: Order[], resources: DeliveryResource[]): Promise<OrderAssignment[]>;
}
```

### 集成注意事项

1. 所有API密钥应通过环境变量配置，不要硬编码在代码中
2. 建议实现接口降级策略
3. 需要实现完整的错误处理机制
4. 关键接口需要添加重试机制
5. 考虑实现接口调用限流

### 开发建议

1. 优先实现核心业务接口
2. 建议使用TypeScript定义接口类型
3. 实现Mock数据接口用于开发测试
4. 添加接口调用日志记录
5. 实现接口性能监控 