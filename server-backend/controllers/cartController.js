
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel');

// Create or Add Item to Cart
const createCart = async (req, res) => {
  try {
    const userId = req.user._id || req.user.id;
    const { productId } = req.body;
    let quantity = req.body.quantity || 1; // Default to 1 if not provided

    if (!productId ) {
      return res.status(400).json({ message: "Product ID and quantity are required" });
    }

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
    } else {
      const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product: productId, quantity });// add product to cart
      }
    }
    // calculate total price
    await cart.calculateTotalPrice(); 
    await cart.save();

    res.status(201).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// Get Cart by User ID
const getCart = async (req, res) => {
  try {
    const userId = req.params.userId;

    if (req.user.id !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    await cart.calculateTotalPrice();

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Update Cart 
const updateCart = async (req, res) => {
  try {
    const userId = req.user.id;          
    const cartId = req.params.id;        
    const { productId, quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    const cart = await Cart.findById(cartId);
    if (!cart || cart.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied or cart not found" });
    }
    // Find the product in cart
    const item = cart.items.find(item => item.product.toString() === productId);

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }
    // Update quantity
    item.quantity = quantity;
    // Recalculate total price 
    await cart.calculateTotalPrice();

    await cart.save();

    res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Remove Single Item from Cart
const removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    
    // find the user's cart
    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // remove the item from the cart
    cart.items = cart.items.filter((item) => !item.product.equals(productId));

    // if no items left, delete the cart
    if (cart.items.length === 0) {
      await Cart.deleteOne({ user: userId });
      return res.status(200).json({ message: "Cart is empty" });
    }
    // recalculate total price and save the cart
    await cart.calculateTotalPrice();
    await cart.save();

    res.status(200).json({ message: "Item removed", cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};  



// Clear All Items from Cart
const clearCart = async (req, res) => {
  try {
    // validate user
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID mismatch" });
    }
    // update cart in one operation
    const result = await Cart.updateOne(
      { user: userId },
      { $set: { items: [], totalPrice: 0 } }
    );
    // Check if cart was found
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart cleared" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



// Delete Entire Cart
const deleteCart = async (req, res) => {
  try {
    const userId = req.user.id;  // user's ID from auth

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // confirm cart.user matches userId 
    if (cart.user.toString() !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    await cart.deleteOne();

    res.status(200).json({ message: "Cart deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



    
















module.exports = {createCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart,
    deleteCart,
};