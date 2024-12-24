const Inventory = require('../models/Inventory');
const nodemailer = require('nodemailer');
const config = require('../config/config');

class InventoryAlertService {
  constructor() {
    this.mailer = nodemailer.createTransport(config.email);
  }

  // 检查库存预警
  async checkInventoryAlerts() {
    try {
      // 查找库存低于警戒线的药品
      const lowStockItems = await Inventory.find({
        $where: 'this.stock <= this.criticalStock'
      });

      // 查找即将过期的药品
      const expiringItems = await Inventory.find({
        expiryDate: {
          $lte: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天内过期
        }
      });

      // 生成预警报告
      const alerts = {
        lowStock: lowStockItems.map(item => ({
          id: item._id,
          name: item.name,
          currentStock: item.stock,
          criticalStock: item.criticalStock,
          isEmergencyMed: item.isEmergencyMed
        })),
        expiring: expiringItems.map(item => ({
          id: item._id,
          name: item.name,
          expiryDate: item.expiryDate,
          stock: item.stock,
          isEmergencyMed: item.isEmergencyMed
        }))
      };

      // 发送预警通知
      if (alerts.lowStock.length > 0 || alerts.expiring.length > 0) {
        await this.sendAlertNotification(alerts);
      }

      return alerts;
    } catch (error) {
      console.error('Inventory alert check error:', error);
      throw error;
    }
  }

  // 发送预警通知
  async sendAlertNotification(alerts) {
    try {
      const emergencyAlerts = alerts.lowStock.filter(item => item.isEmergencyMed);
      
      if (emergencyAlerts.length > 0) {
        // 紧急药品库存预警，立即发送
        await this.mailer.sendMail({
          to: config.alertEmails,
          subject: '紧急药品库存预警',
          html: this.generateAlertEmailTemplate(emergencyAlerts, true)
        });
      }

      // 常规库存预警
      await this.mailer.sendMail({
        to: config.alertEmails,
        subject: '药品库存预警报告',
        html: this.generateAlertEmailTemplate(alerts)
      });
    } catch (error) {
      console.error('Alert notification error:', error);
      throw error;
    }
  }

  // 生成预警邮件模板
  generateAlertEmailTemplate(alerts, isEmergency = false) {
    // 生成HTML邮件模板
  }
}

module.exports = InventoryAlertService; 