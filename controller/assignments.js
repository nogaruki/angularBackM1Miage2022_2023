let Assignment = require('../model/assignment');

// Récupérer tous les assignments (GET)
function getAssignments(req, res) {
    var aggregateQuery;
    var rendu;

    if (req.query.rendu == "") {
        aggregateQuery = Assignment.aggregate([{
            $match: {
                nom: { $regex: "^" + req.query.filterValue, $options: "i" }
            }
        }]);
    } else {
        if (req.query.rendu == "true") {
            rendu = true;
        } else {
            rendu = false
        }
        aggregateQuery = Assignment.aggregate([{
            $match: {
                nom: { $regex: "^" + req.query.filterValue, $options: "i" },
                rendu: rendu
            }
        }]);
    }

    console.log(req.query.rendu);
    Assignment.aggregatePaginate(aggregateQuery, {
        page: parseInt(req.query.page) || 1,
        limit: parseInt(req.query.limit) || 10,
    },
        (err, assignments) => {
            if (err) {
                res.send(err);
            }
            res.send(assignments);
        }
    );
}


// Récupérer un assignment par son id (GET)
function getAssignment(req, res) {
    let assignmentId = req.params.id;

    Assignment.findOne({ id: assignmentId }, (err, assignment) => {
        if (err) { res.send(err) }
        res.json(assignment);
    })
}

// Ajout d'un assignment (POST)
function postAssignment(req, res) {

    if (req.body.rendu && req.body.note === undefined) {
        return res.status(400).json({ message: 'Can\'t create assignment because rendu = true and no mark was given' })
    }

    let id = 1;

    console.log("POST assignment reçu :");
    console.log(req.body);

    Assignment.find()
        .sort("-id")
        .limit(1)
        .exec((error, data) => {
            if (error) {
                res.status(400).json({ message: 'Error while creating assignment' })
            }
            let assignment = new Assignment();
            if (data.length>0) {
                assignment.id = data[0].id + 1;
            } else {
                assignment.id = id;
            }
            assignment.nom = req.body.nom;
            assignment.dateDeRendu = req.body.dateDeRendu;
            assignment.rendu = req.body.rendu;
            assignment.note = req.body.note;
            assignment.subject_id = req.body.subject_id;
            assignment.teacher_id = req.body.teacher_id;
            assignment.student_id = req.body.student_id;

            assignment.save((err) => {
                if (err) {
                    res.send('cant post assignment ', err);
                }
                res.json({ message: `${assignment.nom} saved!` })
            })

        });


}

// Update d'un assignment (PUT)
function updateAssignment(req, res) {
    console.log("UPDATE recu assignment : ");
    console.log(req.body);

    Assignment.findOne({ _id: req.body._id }, (err, assignment) => {
        if (err) { res.send(err) }

        if (assignment.note === undefined) {
            return res.status(400).json({ message: 'Can\'t update because assignments doesn\'t have grade' });
        }

        assignment.rendu = true;
        assignment.save((err) => {
            if (err) {
                res.send('cant update assignment ', err);
            }
            res.json({ message: 'updated' })
        })
    })

}

// suppression d'un assignment (DELETE)
function deleteAssignment(req, res) {

    Assignment.findByIdAndRemove(req.params.id, (err, assignment) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: `${assignment.nom} deleted` });
    })
}



module.exports = { getAssignments, postAssignment, getAssignment, updateAssignment, deleteAssignment };