const Order = require('../models/Order');
const Drone = require('../models/Drone');
const Inventory = require('../models/Inventory');

exports.createEmergencyOrder = async (req, res) => {
  try {
    const {
      items,
      deliveryAddress,
      emergencyContact,
      medicalCondition,
      prescriptionImage
    } = req.body;

    // 验证紧急药品库存
    for (const item of items) {
      const product = await Inventory.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          message: `药品 ${product.name} 库存不足`
        });
      }
    }

    // 查找最近的可用应急无人机
    const nearestDrone = await Drone.findOne({
      droneType: 'emergency',
      status: 'available',
      'payload.hasRefrigeration': true // 如果需要冷藏
    }).sort({
      currentLocation: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: deliveryAddress.coordinates
          }
        }
      }
    });

    if (!nearestDrone) {
      return res.status(400).json({
        message: '暂无可用的应急无人机'
      });
    }

    // 创建紧急订单
    const order = new Order({
      orderId: `EM${Date.now()}`,
      userId: req.userData.userId,
      orderType: 'emergency',
      priority: 1,
      items,
      deliveryAddress,
      emergencyContact,
      medicalCondition,
      prescriptionImage,
      droneId: nearestDrone._id,
      status: 'confirmed',
      estimatedDeliveryTime: new Date(Date.now() + 30 * 60000) // 预计30分钟送达
    });

    await order.save();

    // 更新无人机状态
    nearestDrone.status = 'busy';
    await nearestDrone.save();

    // 更新库存
    for (const item of items) {
      await Inventory.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    res.status(201).json({
      message: '紧急订单已创建',
      order
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: '服务器错误'
    });
  }
}; 