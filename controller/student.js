const Student = require('../model/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');
const e = require("express");

function loginStudent(req, res) {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }
    let username = req.body.username;
    let password = req.body.password;

    Student.findOne({ username: username }, (err, student) => {
        if (err) { return res.send(err) }
        if (!student) { return res.send({message: "Student not found"}) }
        bcrypt.compare(password, student.password, (err, result) => {
            if (err) { return res.send(err) }
            if (!result) { return res.send({message: "Wrong password"}) }
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
        if (!student) { return res.status(500).send({message :"Student not found"}) }
        return res.status(200).send({ student: student });
    })
}

function getStudentByToken(req, res) {
    let token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, config.secret, function(err, decoded) {
            if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            else {
                let id = decoded.id;
                Student.findOne({ _id: id }, (err, student) => {
                    if (err) { return res.send(err); }
                    if (!student) { res.status(500).send({message :"Student not found"}); return; }
                    return res.status(200).send(student);
                })
            }
        });
    }
}



function registerStudent(req, res) {
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }

    let username = req.body.username;
    Student.findOne({ username: username}, (err, student) => {
        if (err) { return res.send(err) }
        if (student) {
            return res.send({message: "Username already taken"})
        }

    });
    let email = req.body.email;
    Student.findOne({ email: email }, (err, student) => {
        if (err) { return res.send(err) }
        if (student) {
            return res.send({message: "Email already taken"})
        }

    });

    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Student.create({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            prenom: req.body.prenom,
            nom: req.body.nom
        },
        function(err, student) {
            if (err) return res.status(500).send({message :"There was a problem registering the student."})
            console.log("Création d'un student effectué :");
            console.log(student)
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });
            return res.status(200).send({ auth: "student", token: token });
        });
}

function updateStudent(req, res) {
    if (!req.body.username || !req.body.email || !req.body.prenom || !req.body.nom) {
        return res.status(400).send({ message: "Veuillez remplir tous les champs" });
    }
    //Vérifeir si le password est le même que celui enregistré
    let id = req.params.id;
    Student.updateOne({ _id: req.body._id }, {
            username: req.body.username,
            email: req.body.email,
            prenom: req.body.prenom,
            nom: req.body.nom
        },
        function(err, student) {
            if (err) return res.status(500).send({message :"There was a problem updating the student."})
            console.log("Update d'un student effectué :");
            console.log(student)
            return res.status(200).send(student);
        } );

}

module.exports = { loginStudent, registerStudent, getStudentById, getStudentByToken, updateStudent };