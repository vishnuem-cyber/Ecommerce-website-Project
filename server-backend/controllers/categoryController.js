const Category = require('../models/CategoryModel');
const Product = require('../models/ProductModel');

// Create Category (Admin only)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category with the same name exists
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      return res.status(400).json({ message: 'Category with this name already exists.' });
    }

    const newCategory = await Category.create({
      name,
      description,
      createdBy: req.user.id // Comes from authAdmin
    });

    res.status(201).json({
      message: 'Category created successfully',
      category: newCategory
    });
  } catch (error) {
    console.error('Create Category Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get All Categories (User, Seller, Admin)
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    console.error('Get Categories Error:', error);
    res.status(500).json({ message: 'Failed to fetch categories' });
  }
};

// Update Category (Admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category updated successfully',
      category: updatedCategory
    });
  } catch (error) {
    console.error('Update Category Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Delete Category (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if products are linked to the category
    const products = await Product.find({ categoryId: id });
    if (products.length > 0) {
      return res.status(400).json({
        message: 'Cannot delete category with associated products'
      });
    }

    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    res.status(200).json({
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('Delete Category Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
};
