const Wishlist = require('../models/WishlistModel');
const Product = require('../models/ProductModel');

// Add to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    // Add to wishlist or return existing
    const wishlistItem = await Wishlist.findOneAndUpdate(
      { user: userId, product: productId },
      {},
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ message: 'Added to wishlist', wishlistItem });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get wishlist items for logged-in user
exports.getWishlist = async (req, res) => {
  try {
    const wishlist = await Wishlist.find({ user: req.user.id }).populate('product');
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Remove from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const removed = await Wishlist.findOneAndDelete({
      user: req.user.id,
      product: req.params.id,
    });

    if (!removed) return res.status(404).json({ message: 'Item not found in wishlist' });

    res.status(200).json({ message: 'Removed from wishlist' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
