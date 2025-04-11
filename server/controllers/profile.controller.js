const Profile = require('../models/profile.model.js');
const bcrypt = require('bcryptjs');




exports.profile = function (req, res) {
    const profile = new Profile(req.body);
    profile.save()
        .then(() => res.status(201).json({ message: 'Profile Created Successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};


exports.login = async function (req, res) {
    const { gmail, password } = req.body;

    if (!gmail || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find the user by email
        const profile = await Profile.findOne({ gmail });

        if (!profile) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, profile.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        // Authentication success, just send a message back
        res.status(200).json({ message: 'Login successful',   role: profile.role });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};