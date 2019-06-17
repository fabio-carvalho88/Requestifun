const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const ItemController = require('../controllers/item.controller');
const ReqController = require('../controllers/requisition.controller');

// *** Routes ***
router.get('/readUsers', UserController.readUsers);
router.get('/readUsersId/:id', UserController.readUsersId);
router.get('/tableUsers', UserController.tableUsers);
router.put('/editUsers', UserController.editUsers);
router.get('/deleteLogic', UserController.deleteLogicUsers); // Disactivate user in case of bad behavior
router.get('/reactivateLogic', UserController.reactivateLogicUsers); // Reactivate user

router.post('/postItem', ItemController.postItem);
router.get('/readItems', ItemController.readItems);
router.get('/readItem/:id', ItemController.readItemId);
router.put('/editItem', ItemController.editItem);
router.delete('/removeItem', ItemController.removeItem);


router.post('/postReq', ReqController.postReq);
router.get('/readReqs', ReqController.readReqs);
router.put('/editReq', ReqController.editReq);

module.exports = router;