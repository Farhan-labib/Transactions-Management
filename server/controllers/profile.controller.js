const Profile = require('../models/profile.model.js');




exports.profile = function (req, res) {
    const profile = new Profile(req.body);
    profile.save()
        .then(() => res.status(201).json({ message: 'Profile Created Successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};

