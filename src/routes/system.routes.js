const express = require('express');
const router = express.Router();
const sys = require('../controllers/system.controller');

router.get('/health', sys.health);

module.exports = router;
