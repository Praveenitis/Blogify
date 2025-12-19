const mongoose = require('mongoose');
require('dotenv').config();

const url = process.env.MONGO_DB_URL || 'mongodb://127.0.0.1:27017/blogify';

const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(url);
        console.log('Successfully Connected to MONGODB');
    } catch (error) {
        console.error('Failed connecting to database', error);
        throw error;
    }
};

module.exports = connectDB;