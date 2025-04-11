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
        
        const profile = await Profile.findOne({ gmail });

        if (!profile) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        
        const isMatch = await bcrypt.compare(password, profile.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password.' });
        }

        
        res.status(200).json({ message: 'Login successful',   role: profile.role,  l_gmail: profile.gmail });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error, please try again later.' });
    }
};

exports.checkUserExists = async (req, res) => {
    const { gmail } = req.params;
    try {
        const user = await Profile.findOne({ gmail });
        if (user) {
            res.status(200).json({ exists: true });
        } else {
            res.status(404).json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
};