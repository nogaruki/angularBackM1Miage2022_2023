let Teacher = require('../model/teacher');

function loginTeacher(req, res) {
    let username = req.params.username;
    let password = req.params.password;

    Teacher.findOne({ username: username }, (err, teacher) => {
        if (err) { res.send(err) }
        if(!teacher) { res.send("Teacher not found") }
        let token = jwt.sign({ id: student._id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
          });
          res.status(200).send({ auth: true, token: token, student: student });
    })
}

async function registerTeacher(req, res) {

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
            let token = jwt.sign({ id: student._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
                });
                res.status(200).send({ auth: true, token: token, teacher: teacher });
    });
}


module.exports = { loginTeacher, registerTeacher };
