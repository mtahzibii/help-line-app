const express = require('express');
var cors = require('cors');
const dotenv = require('dotenv').config();
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const PORT = process.env.PORT || 6000;

// Connect to database
connectDB();

// Initialize app
const app = express();

app.use(
 cors({
  origin: '*',
 })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/tickets', require('./routes/ticketRoutes'));
app.use('/api/notes', require('./routes/noteRoutes'));

// Serve Frontend
if (process.env.NODE_ENV === 'production') {
 // Set build folder as static
 app.use(express.static(path.join(__dirname, '../frontend/build')));

 // FIX: below code fixes app crashing on refresh in deployment
 app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
 });
} else {
 app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the Support Desk API' });
 });
}

// Error Handler
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
