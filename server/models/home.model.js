const { Schema, model } = require('mongoose');

// Schema
const homeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: false,
    },


});

// Model
const Home = model('Home', homeSchema);

// Export
module.exports = Home;
