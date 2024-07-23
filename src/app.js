const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const methodOverride = require('method-override');
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Routes
app.use('/users', userRoutes);

// Default route handler
app.get('/', (req, res) => {
  res.redirect('/users');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
