const express = require('express');

const projecController = require('../controllers/projectController')

const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticateToken,projecController.getAllProjects);
router.post('/', authenticateToken, projecController.createProject);

module.exports = router;