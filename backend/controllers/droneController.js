const Drone = require('../models/Drone');
const DroneRouteService = require('../services/droneRouteService');

exports.getAllDrones = async (req, res) => {
  try {
    const drones = await Drone.find();
    res.json(drones);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

exports.getDroneById = async (req, res) => {
  try {
    const drone = await Drone.findById(req.params.id);
    if (!drone) {
      return res.status(404).json({ message: '无人机不存在' });
    }
    res.json(drone);
  } catch (error) {
    res.status(500).json({ message: '服务器错误' });
  }
};

// ... 其他控制器方法 