let User = require('../model/user');

// Récupérer un assignment par son id (GET)
function getUser(req, res) {
    let userId = req.params.id;

    User.findOne({ id: userId }, (err, user) => {
        if (err) { res.send(err) }
        res.json(user);
    })
}

// Ajout d'un assignment (POST)
function postUser(req, res) {
    let user = new User();
    user.id = req.body.id;
    user.username = req.body.username;
    user.password = req.body.password;
    user.prenom = req.body.prenom;
    user.nom = req.body.nom;

    console.log("POST user reçu :");
    console.log(user)

    user.save((err) => {
        if (err) {
            res.send('cant post user ', err);
        }
        res.json({ message: `User : ${user.id} saved!` })
    })
}


module.exports = { getUser, postUser };
