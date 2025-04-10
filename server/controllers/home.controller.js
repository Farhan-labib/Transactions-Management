const Home = require('../models/home.model.js');



exports.home = (req, res) => {
    Home.find()
        .then(homeData => res.json(homeData))
        .catch(error => res.status(400).json({ error }));
};

exports.insertHome = function (req, res) {
    const home = new Home(req.body);
    home.save()
        .then(() => res.status(201).json({ message: 'Home created successfully!' }))
        .catch((error) => res.status(400).json({ error }));
};

