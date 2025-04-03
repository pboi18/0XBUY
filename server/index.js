const express = require('express');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();
const authRoute = require('./routes/authRoutes')
const productRoute = require('./routes/productRoutes')

const app = express();
const port = process.env.PORT || 3004;

// Middleware to parse JSON
app.use(express.json());


app.use('/api/auth', authRoute)
app.use('/api', productRoute)


// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});