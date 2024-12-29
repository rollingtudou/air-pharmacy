# 无人机药房配送系统 (Drone Pharmacy Delivery System)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/rollingtudou/air-pharmacy)](https://github.com/rollingtudou/air-pharmacy/stargazers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://makeapullrequest.com)

基于 React + Node.js + MongoDB 的智能无人机药品配送管理系统，专注于解决医疗资源分布不均、应急配送效率等问题，助力智慧城市建设与低空经济发展。

## 项目文档导航

### 📋 核心文档
- [项目介绍](./docs/PROJECT_INTRODUCTION.md) - 详细的项目背景、功能特性与发展规划
- [城市融合分析](./docs/URBAN_INTEGRATION.md) - 项目与城市发展的深度融合方案
- [西安发展分析](./docs/XI_AN_ANALYSIS.md) - 西安市低空经济与项目落地可行性分析
- [操作手册](./docs/OPERATION_MANUAL.md) - 系统部署与运维指南

## 功能特点

### 🚁 智能配送
- 实时路径规划与优化
- 多机协同调度系统
- 全自动避障技术
- 精准降落与取放货

### 🏥 医疗服务
- 15分钟医疗服务圈
- 应急药品优先配送
- 冷链药品专业运输
- 医疗物资即时补给

### 📦 智能管理
- 库存智能预警
- 自动补货建议
- 效期智能管理
- 温控全程监测

### 🔐 安全保障
- 多重避障系统
- 应急处理机制
- 数据安全加密
- 全程监控追踪

## 技术架构

### 前端技术栈
- React 18
- TypeScript
- Ant Design 5.x
- Socket.IO Client
- 百度地图 GL API

### 后端技术栈
- Node.js
- Express
- MongoDB
- Socket.IO
- JWT Authentication

## 快速开始

### 环境要求
- Node.js >= 16.x
- MongoDB >= 5.0
- PM2 (生产环境)
- Nginx (生产环境)

### 开发环境设置

1. 克隆项目
```bash
git clone https://github.com/rollingtudou/air-pharmacy.git
cd air-pharmacy
```

2. 安装依赖
```bash
# 前端依赖
cd frontend
npm install

# 后端依赖
cd ../backend
npm install
```

3. 环境配置
```bash
# 前端配置
cd frontend
cp .env.example .env
# 修改配置文件

# 后端配置
cd ../backend
cp .env.example .env
# 修改配置文件
```

4. 启动开发服务器
```bash
# 前端开发服务器
cd frontend
npm start

# 后端开发服务器
cd ../backend
npm run dev
```

## 项目结构

```
drone-pharmacy/
├── docs/                   # 项目文档
│   ├── PROJECT_INTRODUCTION.md    # 项目介绍
│   ├── URBAN_INTEGRATION.md       # 项目与城市发展融合分析
│   ├── XI_AN_ANALYSIS.md         # 项目结合西安发展分析
│   └── OPERATION_MANUAL.md       # 操作手册
├── frontend/              # 前端项目
│   ├── src/
│   │   ├── components/   # 通用组件
│   │   ├── pages/       # 页面组件
│   │   ├── services/    # API服务
│   │   └── utils/       # 工具函数
│   └── public/          # 静态资源
└── backend/              # 后端项目
    ├── controllers/     # 控制器
    ├── models/         # 数据模型
    ├── routes/         # 路由
    └── services/       # 业务逻辑
```

## 部署

项目使用 GitHub Actions 进行自动化部署，配置文件位于 `.github/workflows/deploy.yml`。详细部署说明请参考 [操作手册](./docs/OPERATION_MANUAL.md)。

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE)

## 联系方式

- 项目维护者：[kevin](mailto:fengk677@gmail.com)
- 作者博客：[https://www.fengzhe.space](https://www.fengzhe.space)

## 🤝 参与贡献

欢迎参与项目贡献！请查看我们的[贡献指南](./docs/CONTRIBUTING.md)了解如何开始。

### 贡献者

感谢以下贡献者的参与：

<a href="https://github.com/rollingtudou/air-pharmacy/graphs/contributors">
  <img src="https://contributors-img.web.app/image?repo=rollingtudou/air-pharmacy" />
</a>

## 📝 更新日志

查看[CHANGELOG.md](./docs/CHANGELOG.md)了解项目的版本更新历史。

## 🛣️ 开发路线图

查看我们的[开发计划](./docs/ROADMAP.md)了解项目的未来发展方向。

## 💬 社区讨论

- [提交 Issue](https://github.com/rollingtudou/air-pharmacy/issues)
- [项目讨论](https://github.com/rollingtudou/air-pharmacy/discussions)

## 🌟 支持项目

如果这个项目对您有帮助，请考虑给它一个星标 ⭐️
