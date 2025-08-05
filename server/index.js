// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

const connectDB = require('./config/db');
const urlRoutes = require('./routes/url');
const authRoutes = require('./routes/auth');

const app = express();

// ✅ Connect to MongoDB
connectDB();
app.use('/', require('./routes/url'));

// ✅ CORS should be set before any route handling
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

// ✅ Middleware
app.use(express.json());

// ✅ Routes
app.use('/api', urlRoutes);      // Example: POST /api/shorten
app.use('/auth', authRoutes);    // Example: POST /auth/register, POST /auth/login

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
// // server/index.js
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();

// // Connect to Database
// connectDB();

// // Middlewares
// app.use(cors());
// app.use(express.json());

// // Define Routes
// app.use('/', require('./routes/url'));

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// module.exports = app; // For testing purposes


// const express = require('express');
// const app = express();
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// // const cors = require('cors');
// const connectDB = require('./config/db');          // ← check this
// const urlRoutes = require('./routes/url');    // ← check this

// const authRoutes = require('./routes/auth');
// app.use(authRoutes);

// dotenv.config();
// const cors = require('cors');

// app.use(cors({
//   origin: 'http://localhost:3000',  // ✅ Allow frontend
//   credentials: true
// }));

// app.use(express.json());

// app.use('/', require('./routes/url'));
// app.use('/auth', require('./routes/auth')); // ✅ Add this

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log('MongoDB connected successfully.');
//   app.listen(process.env.PORT || 5000, () => {
//     console.log(`Server running on port ${process.env.PORT || 5000}`);
//   });
// }).catch((err) => console.error('MongoDB connection error:', err));
