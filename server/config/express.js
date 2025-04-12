const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const apiRouter = require('../routes/api.routes');
path = require('path');
const config = require('./config');

module.exports.init = () => {

    // Connect to MongoDB
    mongoose.Promise = global.Promise;
    const databaseURI = process.env.DB_URI
    mongoose.connect(databaseURI)
        .then(() => console.log('MongoDB connected'))
        .catch(err => console.error('MongoDB connection error:', err));



    // Create Express app
    const app = express();


    // Middleware
    app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
    app.use(express.json());



    // Routers
    app.use('/api', apiRouter);


    if (process.env.NODE_ENV === 'development') {
        app.use(express.static(path.join(__dirname, '../../client/build')));

        // Handle React routing, return all requests to React app
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../../client/build', 'index.html'));
        });   
    }


    return app;    
}
