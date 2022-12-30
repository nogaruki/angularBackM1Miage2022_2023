const Student = require('../model/student');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
// Récupérer un assignment par son id (GET)
function getStudent(req, res) {

    let username = req.params.username;
    let password = req.params.password;

    Student.findOne({ username: username }, (err, student) => {
        if (err) { res.send(err) }
        if(!student) { res.send("Student not found") }
        bcrypt.compare(password, student.password, (err, result) => {
            if (err) { res.send(err) }
            if (!result) { res.send("Wrong password") }
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: true, token: token, student: student });
        })
    })
}

// Ajout d'un student (POST)
function postStudent(req, res) {
    
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
            res.status(200).send({ auth: true, token: token, student: student });
    });
}

module.exports = { getStudent, postStudent };
