let Student = require('../model/student');

// Récupérer un assignment par son id (GET)
function getStudent(req, res) {
    let studentId = req.params.id;

    Student.findOne({ id: studentId }, (err, student) => {
        if (err) { res.send(err) }
        res.json(student);
    })
}

// Ajout d'un assignment (POST)
function postStudent(req, res) {
    let student = new Student();
    student.id = req.body.id;
    student.user_id = req.body.user_id;

    console.log("POST student reçu :");
    console.log(student)

    student.save((err) => {
        if (err) {
            res.send('cant post student ', err);
        }
        res.json({ message: `Student : ${student.id} saved!` })
    })
}


module.exports = { getStudent, postStudent };
