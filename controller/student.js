const Student = require('../model/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');

function loginStudent(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }
    let username = req.body.username;
    let password = req.body.password;

    Student.findOne({ username: username }, (err, student) => {
        if (err) { return res.send(err) }
        if (!student) { return res.send("Student not found") }
        bcrypt.compare(password, student.password, (err, result) => {
            if (err) { res.send(err) }
            if (!result) { res.send("Wrong password") }
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: "student", token: token });
        })
    })
}

function getStudentById(req, res) {
    let id = req.params.id;
    if (!id) { return res.status(400).send({ message: "Veuillez remplir tous les champs" }); return; }
    Student.findOne({ _id: id }, (err, student) => {
        if (err) { return res.send(err) }
        if (!student) { return res.status(500).send("Student not found") }
        student.password = bcrypt.decodeBase64(student.password, 24);
        return res.status(200).send({ student: student });
    })
}

function getStudentByToken(req, res) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            else {
                let id = decoded.id;
                Student.findOne({ _id: id }, (err, student) => {
                    if (err) { res.send(err); return; }
                    if (!student) { res.status(500).send("Student not found"); return; }
                    student.password = bcrypt.decodeBase64(student.password, 24);
                    res.status(200).send({ student: student });
                })
            }
            res.status(200).send(decoded);
        });
    }
}



function registerStudent(req, res) {
    console.log("DANS LE REGISTER STUDENT")
    console.log(!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom)
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }
    console.log("apres if")
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    console.log("apres hash")
    Student.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            prenom: req.body.prenom,
            nom: req.body.nom
        },
        function(err, student) {
            if (err) return res.status(500).send("There was a problem registering the student.")
            console.log("Création d'un student effectué :");
            console.log(student)
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: "student", token: token });
        });
}

module.exports = { loginStudent, registerStudent, getStudentById, getStudentByToken };