const express = require('express');
const taskController = require('../controller/task');
const middleWare = require('../middlewareFun');

const router = express.Router();

router.post('/create',middleWare.verifyToken , taskController.create);
router.get('/list', middleWare.verifyToken , taskController.listing);
router.get('/search/:title', middleWare.verifyToken , taskController.listingSearch);
router.get('/:id', middleWare.verifyToken ,taskController.viewSingleTask);
module.exports = router;