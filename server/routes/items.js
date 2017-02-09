var express = require('express');
var router = express.Router();
var items = require('../models/item.js');
var itemController = require('../controller/itemController.js')



router.post('/', itemController.create);
router.get('/', itemController.findAll);
router.put('/', itemController.updateStock);
router.post('/tes', function(req, res){
  res.send({body: req.body, file: req.file})
})

module.exports = router
