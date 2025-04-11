const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

// Schema
const ProfileSchema = new Schema({
    gmail: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});

// hash password
ProfileSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 

    try {
        const salt = await bcrypt.genSalt(10); 
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (err) {
        next(err);
    }
});

// Model
const profile = model('profile', ProfileSchema);

// Export
module.exports = profile;
