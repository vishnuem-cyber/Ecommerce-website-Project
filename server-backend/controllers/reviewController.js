// controllers/reviewController.js
const Review = require('../models/ReviewModel');
const Product = require('../models/ProductModel');




// Create or Update Review
const createReview = async (req, res) => {
  try {
    const userId = req.user.id; // extracted from auth middleware
    const { productId, rating, comment } = req.body;

    // Validate required fields
    if (!productId || !rating) {
      return res.status(400).json({ message: 'Product ID and rating are required' });
    }

    // Validate rating range
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5' });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Check if the user already reviewed the product
    let review = await Review.findOne({ userId, productId });

    if (review) {
      // Update existing review
      review.rating = rating;
      review.comment = comment;
      review.updatedAt = Date.now();
    } else {
      // Create a new review
      review = new Review({
        userId,
        productId,
        rating,
        comment,
      });
    }

    await review.save();

    // Update product average rating
    const reviews = await Review.find({ productId });
    const averageRating =
      reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    product.averageRating = averageRating;
    await product.save();

    res.status(200).json({ message: 'Review submitted successfully', review });

  } catch (error) {
    console.error('Error creating review:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



// UPDATE REVIEW

const updateReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== userId) return res.status(403).json({ message: 'Unauthorized' });

    if (req.body.rating !== undefined) {
      review.rating = req.body.rating;
    }

    if (req.body.comment !== undefined) {
      review.comment = req.body.comment;
    }

    await review.save();

    const product = await Product.findById(review.productId);
    if (product) {
      const reviews = await Review.find({ productId: review.productId });
      const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
      product.averageRating = avg;
      await product.save();
    }

    res.status(200).json({ message: 'Review updated', review });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// DELETE REVIEW

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user.id;

    const review = await Review.findById(reviewId);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId.toString() !== userId) return res.status(403).json({ message: 'Unauthorized' });

    const productId = review.productId;
    await Review.findByIdAndDelete(reviewId);

    const reviews = await Review.find({ productId });
    const avg = reviews.length ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0;

    const product = await Product.findById(productId);
    if (product) {
      product.averageRating = avg;
      await product.save();
    }

    res.status(200).json({ message: 'Review deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// GET REVIEWS BY PRODUCT ID
const getReviewsByProductId = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId }).populate('userId', 'name');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// GET AVERAGE RATING
const getAverageRating = async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviews = await Review.find({ productId });
    if (!reviews.length) return res.status(200).json({ averageRating: 0 });

    const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
    res.status(200).json({ averageRating: average });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// GET REVIEWS BY USER
const getUserReviews = async (req, res) => {
  try {
    const userId = req.params.userId;
    const reviews = await Review.find({ userId }).populate('productId', 'title');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all reviews for Admin
const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('userId', 'name email')
      .populate('productId', 'title');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get all reviews', error: error.message });
  }
};


// Get reviews for a seller
const getSellerReviews = async (req, res) => {
  try {
    const { sellerId } = req.params;
    const products = await Product.find({ seller: sellerId });
    console.log("Products by seller:", products);

    const productIds = products.map(p => p._id);
    console.log("Product IDs:", productIds);

    const reviews = await Review.find({ productId: { $in: productIds } })
      .populate('userId', 'name')
      .populate('productId', 'title');

    console.log("Reviews found:", reviews);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get seller reviews', error: error.message });
  }
};



module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getReviewsByProductId,
  getAverageRating,
  getUserReviews,
  getAllReviews,
  getSellerReviews,
  
  
};
