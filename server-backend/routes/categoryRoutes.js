const express = require('express');
const categoryRouter = express.Router();
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require('../controllers/categoryController');
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

// Create a new category
categoryRouter.post('/', authAdmin, createCategory);

// Get all categories
categoryRouter.get('/', authUser, getCategories);

// Update a category
categoryRouter.put('/:id', authAdmin, updateCategory);

// Delete a category
categoryRouter.delete('/:id', authAdmin, deleteCategory);

module.exports = categoryRouter;
