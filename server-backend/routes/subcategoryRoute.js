const express = require('express');
const subcategoryRouter = express.Router();
const {
  createSubcategory,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory
} = require('../controllers/subcategoryController');
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

// Create a new subcategory
subcategoryRouter.post('/', authAdmin, createSubcategory);

// Get a subcategory by ID
subcategoryRouter.get('/:id', authUser, getSubcategoryById);

// Update a subcategory
subcategoryRouter.put('/:id', authAdmin, updateSubcategory);

// Delete a subcategory
subcategoryRouter.delete('/:id', authAdmin, deleteSubcategory);

module.exports = subcategoryRouter;
