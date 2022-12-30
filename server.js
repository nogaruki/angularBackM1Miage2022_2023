let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let assignment = require('./controller/assignments');

let mongoose = require('mongoose');
const teacher = require('./controller/teacher');
const student = require('./controller/student');
const subject = require('./controller/subject');
const comment = require('./controller/comment');

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://Fuzay:lgb5Gveyya8hIJaB@clusterangular.0gxzn2l.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(uri, options)
    .then(() => {
            console.log("Connecté à la base MongoDB assignments dans le cloud !");
            console.log("at URI = " + uri);
            console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
        },
        err => {
            console.log('Erreur de connexion: ', err);
        });

// Pour accepter les connexions cross-domain (CORS)
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

//TEACHER

app.route(prefix + '/teacher/post')
    .post(teacher.postTeacher);

app.route(prefix + '/teacher/get')
    .post(teacher.getTeacher);

//STUDENT

app.route(prefix + '/student/add')
    .post(student.postStudent);

app.route(prefix + '/student/get')
    .post(student.getStudent);

//ASSIGNMENT

app.route(prefix + '/assignments')
    .get(assignment.getAssignments)
    .post(assignment.postAssignment)
    .put(assignment.updateAssignment);

app.route(prefix + '/assignments/:id')
    .get(assignment.getAssignment)
    .delete(assignment.deleteAssignment);

//SUBJECT
app.route(prefix + '/subject')
    .post(subject.postSubject);

app.route(prefix + '/subject/:id')
    .get(subject.getSubject);

//COMMENT

app.route(prefix + '/comment')
    .post(comment.postComment);

app.route(prefix + '/comments/:assignmentId')
    .get(comment.getComments);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;