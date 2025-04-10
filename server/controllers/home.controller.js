const Home = require('../models/home.model.js');


// Home Controller Function
exports.home = (_req, res) => {
    res.send( 'Welcome to the Home!' )
};

exports.insertHome = function (req, res) {
    const home = new Home(req.body);
    home.save()
        .then(() => res.status(201).json({ message: 'Home created successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};

