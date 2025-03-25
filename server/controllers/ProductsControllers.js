const { admin } = require('../config/firebase'); // Destructure admin
const { db } = require('../config/firebase');


// Add a new product
exports.addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      condition,
      description,
      location,
      tags,
      shippingOptions,
      image,
      category, // Add category field
    } = req.body;

    // Validate input
    if (
      !title ||
      !price ||
      !condition ||
      !description ||
      !location ||
      !tags ||
      !shippingOptions ||
      !image ||
      !category // Validate category field
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Get the user ID from the token
    const userId = req.user.id;

    // Create a new product object
    const product = {
      title,
      price: parseFloat(price), // Ensure price is a number
      condition,
      description,
      location,
      tags: Array.isArray(tags) ? tags : tags.split(','), // Convert tags to an array
      shippingOptions: Array.isArray(shippingOptions)
        ? shippingOptions
        : shippingOptions.split(','), // Convert shipping options to an array
      image,
      category, // Include category field
      userId, // Associate the product with the user
      createdAt: admin.firestore.FieldValue.serverTimestamp(), // Add a timestamp
    };

    // Add the product to Firestore
    const docRef = await db.collection('products').add(product);

    // Return the product ID and data
    res.status(201).json({ id: docRef.id, ...product });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product' });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    // Fetch all products from Firestore
    const snapshot = await db.collection('products').get();

    // Map through the documents and extract data
    const products = [];
    snapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    // Return the products
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};


// Get product by ID
exports.getProductById = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Fetch the product from Firestore
      const doc = await db.collection('products').doc(id).get();
  
      // Check if the product exists
      if (!doc.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return the product data
      res.status(200).json({ id: doc.id, ...doc.data() });
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ error: 'Failed to fetch product' });
    }
  };

  // Delete product by ID
exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Check if the product exists
      const doc = await db.collection('products').doc(id).get();
      if (!doc.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Delete the product
      await db.collection('products').doc(id).delete();
  
      // Return success message
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ error: 'Failed to delete product' });
    }
  };

  // Get products by category
exports.getProductsByCategory = async (req, res) => {
    try {
      const { category } = req.params;
  
      // Fetch products with the specified category
      const snapshot = await db
        .collection('products')
        .where('category', '==', category)
        .get();
  
      // Map through the documents and extract data
      const products = [];
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() });
      });
  
      // Return the products
      res.status(200).json(products);
    } catch (error) {
      console.error('Error fetching products by category:', error);
      res.status(500).json({ error: 'Failed to fetch products by category' });
    }
  };

  // Edit a product by ID
exports.editProduct = async (req, res) => {
    try {
      const { id } = req.params; // Product ID
      const {
        title,
        price,
        condition,
        description,
        location,
        tags,
        shippingOptions,
        image,
        category,
      } = req.body;
  
      // Validate input (at least one field should be provided)
      if (
        !title &&
        !price &&
        !condition &&
        !description &&
        !location &&
        !tags &&
        !shippingOptions &&
        !image &&
        !category
      ) {
        return res.status(400).json({ error: 'At least one field is required to update' });
      }
  
      // Create an update object with only the provided fields
      const updateData = {};
      if (title) updateData.title = title;
      if (price) updateData.price = parseFloat(price); // Ensure price is a number
      if (condition) updateData.condition = condition;
      if (description) updateData.description = description;
      if (location) updateData.location = location;
      if (tags) updateData.tags = Array.isArray(tags) ? tags : tags.split(','); // Convert tags to an array
      if (shippingOptions)
        updateData.shippingOptions = Array.isArray(shippingOptions)
          ? shippingOptions
          : shippingOptions.split(','); // Convert shipping options to an array
      if (image) updateData.image = image;
      if (category) updateData.category = category;
  
      // Add a timestamp for the last update
      updateData.updatedAt = admin.firestore.FieldValue.serverTimestamp();
  
      // Update the product in Firestore
      await db.collection('products').doc(id).update(updateData);
  
      // Fetch the updated product
      const updatedProduct = await db.collection('products').doc(id).get();
  
      // Check if the product exists
      if (!updatedProduct.exists) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Return the updated product
      res.status(200).json({ id: updatedProduct.id, ...updatedProduct.data() });
    } catch (error) {
      console.error('Error editing product:', error);
      res.status(500).json({ error: 'Failed to edit product' });
    }
  };