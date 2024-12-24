const Drone = require('../models/Drone');
const Order = require('../models/Order');
const DroneRouteService = require('./droneRouteService');

class DroneMonitorService {
  constructor(io) {
    this.io = io; // Socket.IO 实例
    this.activeDrones = new Map(); // 存储活动中的无人机
  }

  // 初始化无人机监控
  async initializeMonitoring() {
    try {
      // 获取所有正在配送的无人机
      const activeDrones = await Drone.find({
        status: 'busy',
        'flightHistory.status': 'active'
      });

      // 为每个无人机设置监控
      activeDrones.forEach(drone => {
        this.monitorDrone(drone._id);
      });
    } catch (error) {
      console.error('Monitoring initialization error:', error);
    }
  }

  // 监控单个无人机
  async monitorDrone(droneId) {
    try {
      const drone = await Drone.findById(droneId);
      if (!drone) return;

      // 更新无人机状态的定时器
      const updateInterval = setInterval(async () => {
        try {
          const updatedDrone = await Drone.findById(droneId);
          if (!updatedDrone || updatedDrone.status !== 'busy') {
            clearInterval(updateInterval);
            return;
          }

          // 更新无人机位置和状态
          const newStatus = await this.updateDroneStatus(updatedDrone);
          
          // 广播更新到客户端
          this.io.emit('droneUpdate', {
            droneId: updatedDrone._id,
            location: updatedDrone.currentLocation,
            status: newStatus,
            batteryLevel: updatedDrone.batteryLevel
          });

        } catch (error) {
          console.error('Drone update error:', error);
        }
      }, 5000); // 每5秒更新一次

      this.activeDrones.set(droneId, updateInterval);
    } catch (error) {
      console.error('Drone monitoring error:', error);
    }
  }

  // 更新无人机状态
  async updateDroneStatus(drone) {
    try {
      const currentOrder = await Order.findOne({
        droneId: drone._id,
        status: 'delivering'
      });

      if (!currentOrder) return drone.status;

      // 检查电池电量
      if (drone.batteryLevel < 20) {
        return 'critical_battery';
      }

      // 更新配送进度
      const progress = await this.calculateDeliveryProgress(drone, currentOrder);
      
      return {
        status: drone.status,
        progress,
        estimatedTimeRemaining: this.calculateRemainingTime(progress, currentOrder)
      };
    } catch (error) {
      console.error('Status update error:', error);
      return drone.status;
    }
  }

  // 计算配送进度
  calculateDeliveryProgress(drone, order) {
    // 使用turf.js计算已完成的配送距离百分比
    // 返回0-100的进度值
  }

  // 计算剩余配送时间
  calculateRemainingTime(progress, order) {
    const totalTime = order.estimatedDeliveryTime - order.createdAt;
    const remaining = totalTime * (1 - progress / 100);
    return remaining;
  }

  // 停止监控
  stopMonitoring(droneId) {
    const interval = this.activeDrones.get(droneId);
    if (interval) {
      clearInterval(interval);
      this.activeDrones.delete(droneId);
    }
  }
}

module.exports = DroneMonitorService; 