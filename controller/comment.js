let Comment = require('../model/comment');

// Récupérer un assignment par son id (GET)
function getComments(req, res) {
    let assignmentId = req.params.assignmentId;

    Comment.find({ assignment_id: assignmentId }, (err, comments) => {
        if (err) { res.send(err) }
        res.json(comments);
    })
}

// Ajout d'un assignment (POST)
function postComment(req, res) {
    let comment = new Comment();
    comment.id = req.body.id;
    comment.teacher_id = req.body.user_id;
    comment.assignment_id = req.body.assignment_id;
    comment.comment = req.body.comment;

    console.log("POST comment reçu :");
    console.log(comment)

    comment.save((err) => {
        if (err) {
            res.send('cant post comment ', err);
        }
        res.json({ message: `Comment : ${comment.id} saved!` })
    })
}


module.exports = { getComments, postComment };