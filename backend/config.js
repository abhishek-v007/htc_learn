module.exports = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || 'mongodb://localhost:27017/taskmanager',
    jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret'
};
