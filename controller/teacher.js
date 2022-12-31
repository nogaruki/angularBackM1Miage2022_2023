let Teacher = require('../model/teacher');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config');

function loginTeacher(req, res) {
    let username = req.params.username;
    let password = req.params.password;

    Teacher.findOne({ username: username }, (err, teacher) => {
        if (err) { res.send(err) }
        if(!teacher) { res.send("Teacher not found") }
        bcrypt.compare(password, student.password, (err, result) => {
            if (err) { res.send(err) }
            if (!result) { res.send("Wrong password") }
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
              });
              res.status(200).send({ auth: "teacher", token: token});
        })
        let token = jwt.sign({ id: teacher._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token});
    })
}

function getTeacher(req, res) {
    let id = req.params.id;

    Teacher.findOne({ _id: id }, (err, teacher) => {
        if (err) { res.send(err) }
        if(!teacher) { res.send("Teacher not found") }
        res.status(200).send({ teacher: teacher});
    })
}

async function registerTeacher(req, res) {
    if(!req.body.username || !req.body.password || !req.body.email || !req.body.prenom || !req.body.nom || !req.body.picture) {
        res.status(400).send({ message: "Veuillez remplir tous les champs" });
        return;
    }
    const hashedPassword = bcrypt.hashSync(req.body.password, 8);
    Teacher.create({
        email : req.body.email,
        picture:  req.body.picture,
        password : hashedPassword,
        username : req.body.username,
        prenom : req.body.prenom,
        nom : req.body.nom
        },
        function (err, teacher) {
            if (err) return res.status(500).send("There was a problem registering the student.")
            console.log("Création d'un teacher effectué :");
            console.log(teacher)
            let token = jwt.sign({ id: teacher._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: "teacher", token: token});
    });
}


module.exports = { loginTeacher, registerTeacher, getTeacher };
