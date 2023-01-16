let Subject = require('../model/subject');

// Récupérer un assignment par son id (GET)
function getSubject(req, res) {
    let subjectId = req.params.id;

    Subject.findOne({ id: subjectId }, (err, subject) => {
        if (err) { res.send(err) }
        res.json(subject);
    })
}

// Récupérer un assignment par son id (GET)
function getAllSubject(req, res) {
    Subject.find((err, subjects) => {
        if (err) { res.send(err) }
        res.json(subjects);
    })
}

// Ajout d'un assignment (POST)
function postSubject(req, res) {
    let subject = new Subject();
    subject.id = req.body.id;
    subject.title = req.body.title;
    subject.picture = req.body.picture;
    subject.teacher_id = req.body.teacher_id;

    console.log("POST subject reçu :");
    console.log(subject)

    subject.save((err) => {
        if (err) {
            res.send('cant post subject ', err);
        }
        res.json({ message: `Subject : ${subject.id} saved!` })
    })
}


module.exports = { getSubject, postSubject, getAllSubject };
