const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');
const auth = require('../middleware/auth');
const { isAdmin } = require('../middleware/roleCheck');

router.get('/', auth, droneController.getAllDrones);
router.get('/:id', auth, droneController.getDroneById);
router.post('/', auth, isAdmin, droneController.createDrone);
router.put('/:id', auth, isAdmin, droneController.updateDrone);
router.delete('/:id', auth, isAdmin, droneController.deleteDrone);
router.put('/:id/status', auth, droneController.updateDroneStatus);
router.get('/:id/location', auth, droneController.getDroneLocation);

module.exports = router; 