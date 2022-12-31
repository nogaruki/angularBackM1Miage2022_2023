const Student = require('../model/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');

function loginStudent(req, res) {
    if(!req.body.username || !req.body.password) {
        res.status(400).send({ message: "Veuillez remplir tous les champs" });
        return;
    }
    let username = req.body.username;
    let password = req.body.password;

    Student.findOne({ username: username }, (err, student) => {
        if (err) { res.send(err) }
        if(!student) { res.send("Student not found") }
        bcrypt.compare(password, student.password, (err, result) => {
            if (err) { res.send(err) }
            if (!result) { res.send("Wrong password") }
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: "student", token: token});
        })
    })
}
function getStudent(req, res) {
    let id = req.params.id;

    Student.findOne({ _id: id }, (err, student) => {
        if (err) { res.send(err) }
        if(!student) { res.send("Student not found") }
        res.status(200).send({ student: student});
    })
}


function registerStudent(req, res) {
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom) {
        res.status(400).send({ message: "Veuillez remplir tous les champs" });
        return;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Student.create({
        username : req.body.username,
        password : hashedPassword,
        email : req.body.email,
        prenom : req.body.prenom,
        nom : req.body.nom
        },
        function (err, student) {
        if (err) return res.status(500).send("There was a problem registering the student.")

        console.log("Création d'un student effectué :");
        console.log(student)
        let token = jwt.sign({ id: student._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
            });
            res.status(200).send({ auth: "student", token: token});
    });
}

module.exports = { loginStudent, registerStudent, getStudent };
