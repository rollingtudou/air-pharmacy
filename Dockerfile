# 构建阶段
FROM node:16-alpine as builder

# 前端构建
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
RUN npm run build

# 后端构建
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ .
RUN npm run build

# 运行阶段
FROM node:16-alpine
WORKDIR /app

# 复制构建产物
COPY --from=builder /app/frontend/build ./frontend/build
COPY --from=builder /app/backend/dist ./backend/dist
COPY --from=builder /app/backend/package*.json ./backend/

# 安装生产依赖
WORKDIR /app/backend
RUN npm install --production

EXPOSE 3000
CMD ["node", "dist/index.js"] 