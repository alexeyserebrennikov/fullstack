const express = require('express');
const app = express();
const usersRoutes = require('./routes/userRouter');
const ordersRoutes = require('./routes/orderRouter');

app.use(express.json());

// Routes
app.use('/api/users', usersRoutes);
app.use('/api/orders', ordersRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Default route
app.get('/api', (req, res) => {
  res.send('MVC Architecture Proj');
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});