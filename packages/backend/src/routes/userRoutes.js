const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const upload = require('../middleware/upload');

router.post('/', userController.createUser);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.patch('/:id', upload.single('avatar'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
