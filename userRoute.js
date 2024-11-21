const express = require('express');
const router = express.Router();
const {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
} = require('./userController');

// Define routes
router.route('/').get(getUsers).post(createUser);
router.route('/:id').get(getUser).delete(deleteUser).put(updateUser);

module.exports = router;
