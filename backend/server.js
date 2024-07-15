const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const config = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
const taskRoutes = require('./routes/tasks');
const authRoutes = require('./routes/auth');
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(config.mongoURI)
    .then(() => app.listen(config.port, () => console.log(`Server running on port ${config.port}`)))
    .catch(err => console.error(err));
