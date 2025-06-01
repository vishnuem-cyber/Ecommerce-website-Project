const express = require('express');
const reviewRouter = express.Router();
const {
  createReview,
  getReviewsByProductId,
  updateReview,
  deleteReview,getAverageRating,getAllReviews,getUserReviews,
  getSellerReviews
} = require('../controllers/reviewController');
const authUser = require('../middlewares/authUser');
const authAdmin = require('../middlewares/authAdmin');

// Create a new review
reviewRouter.post('/', authUser, createReview);

// Get reviews by product ID
reviewRouter.get('/product/:productId', authUser, getReviewsByProductId);

// Update a review
reviewRouter.put('/:id', authUser, updateReview);

// Delete a review
reviewRouter.delete('/:id', authUser, deleteReview);

// Get all reviews (Admin)
reviewRouter.get('/', authAdmin, getAllReviews);

// Get reviews for a specific user
reviewRouter.get('/user/:userId', authUser, getUserReviews);

// Get reviews for a specific seller
reviewRouter.get('/seller/:sellerId', authUser, getSellerReviews);

// Get average rating for a product
reviewRouter.get('/product/:productId/average-rating', getAverageRating);

module.exports = reviewRouter;
