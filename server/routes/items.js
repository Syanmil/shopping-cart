var express = require('express');
var router = express.Router();
var items = require('../models/item.js');
var itemController = require('../controller/itemController.js')



// router.post('/', upload.single('picture'), itemController.create);
router.get('/', itemController.findAll);
router.put('/', itemController.updateStock);

module.exports = router
