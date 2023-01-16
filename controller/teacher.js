let Teacher = require('../model/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');

function loginTeacher(req, res) {
    if (!req.body.username || !req.body.password) return res.status(400).send({ message: "Veuillez remplir tous les champs" });

    let username = req.body.username;
    let password = req.body.password;
    Teacher.findOne({ username: username }, (err, teacher) => {
        if (err) { return res.send(err) }
        if (!teacher) { return res.send({message : "Teacher not found"}) }
        bcrypt.compare(password, teacher.password, (err, result) => {
            if (err) { return res.send(err) }
            if (!result) { return res.send({message : "Wrong password"}) }
            let token = jwt.sign({ id: teacher._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: "teacher", token: token });
        })

    })
}

function getTeacherById(req, res) {
    let id = req.params.id;
    if (!id) return res.status(400).send({ message: "Veuillez insérer une id" });
    Teacher.findOne({ _id: id }, (err, teacher) => {
        if (err) return res.send(err);
        if (!teacher) return res.status(500).send({message : "Teacher not found"});
        teacher.password = bcrypt.decodeBase64(teacher.password, 8);
        return res.status(200).send(teacher);
    })
}

function getTeacherByToken(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, config.secret, function (err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            let id = decoded.id;
            Teacher.findOne({ _id: id }, (err, teacher) => {
                if (err) { return res.send(err); }
                if (!teacher) return res.status(500).send({message : "Teacher not found"});
                teacher.password = bcrypt.decodeBase64(teacher.password, 8);
                return res.status(200).send(teacher);
            })
        });
    }
}

function registerTeacher(req, res) {

    if (!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }

    if (!req.body.picture) {
        req.body.picture = "https://www.w3schools.com/howto/img_avatar.png";
    }

    let username = req.body.username;
    Teacher.findOne({ username: username}, (err, teacher) => {
        if (err) { return res.send(err) }
        if (teacher) { 
            return res.send({message: "Username already taken"}) 
        }

    });
    let email = req.body.email;
    Teacher.findOne({ email: email }, (err, teacher) => {
        if (err) { return res.send(err) }
        if (teacher) {
            return res.send({message: "Email already taken"})
        }

    });

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Teacher.create({
        id: req.body.id,
        email: req.body.email,
        picture: req.body.picture,
        password: hashedPassword,
        username: req.body.username,
        prenom: req.body.prenom,
        nom: req.body.nom
    },
        function (err, teacher) {
            if (err) return res.status(500).send({message : "There was a problem registering the teacher."})
            console.log("Création d'un teacher effectué :");
            console.log(teacher)
            let token = jwt.sign({ id: teacher._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: "teacher", token: token });
        });
}

function updateTeacher(req, res) {

    if (!req.body.username || !req.body.email || !req.body.prenom || !req.body.nom || !req.body.picture) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }

    Teacher.create({
            id: req.body.id,
            email: req.body.email,
            picture: req.body.picture,
            username: req.body.username,
            prenom: req.body.prenom,
            nom: req.body.nom
        },
        function(err, teacher) {
            if (err) return res.status(500).send({message : "There was a problem registering the teacher."})
            console.log("Création d'un teacher effectué :");
            console.log(teacher)
          
            return res.status(200).send(teacher);
        });
}


module.exports = { loginTeacher, registerTeacher, getTeacherById, getTeacherByToken, updateTeacher };