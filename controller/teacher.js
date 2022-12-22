let Teacher = require('../model/teacher');

// Récupérer un assignment par son id (GET)
function getTeacher(req, res) {
    let teacherId = req.params.id;

    Teacher.findOne({ id: teacherId }, (err, teacher) => {
        if (err) { res.send(err) }
        res.json(teacher);
    })
}

// Ajout d'un assignment (POST)
function postTeacher(req, res) {
    let teacher = new Teacher();
    teacher.id = req.body.id;
    teacher.user_id = req.body.user_id;
    teacher.picture = req.body.picture;

    console.log("POST teacher reçu :");
    console.log(teacher)

    teacher.save((err) => {
        if (err) {
            res.send('cant post teacher ', err);
        }
        res.json({ message: `Teacher : ${teacher.id} saved!` })
    })
}


module.exports = { getTeacher, postTeacher };
