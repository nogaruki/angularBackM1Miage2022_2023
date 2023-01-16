let express = require('express');
const cors = require('cors')
let app = express();
let bodyParser = require('body-parser');

let mongoose = require('mongoose');
let teacher = require('./controller/teacher');
let student = require('./controller/student');
let subject = require('./controller/subject');
let comment = require('./controller/comment');
let assignment = require('./controller/assignments');
let setup_bdd = require('./controller/setup_bdd');

mongoose.Promise = global.Promise;
//mongoose.set('debug', true);

// remplacer toute cette chaine par l'URI de connexion à votre propre base dans le cloud s
const uri = 'mongodb+srv://Fuzay:lgb5Gveyya8hIJaB@clusterangular.0gxzn2l.mongodb.net/assignments?retryWrites=true&w=majority';

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
};

mongoose.connect(uri, options)
    .then(() => {
        console.log("Connecté à la base MongoDB assignments dans le cloud !");
        console.log("at URI = " + uri);
        console.log("vérifiez with http://localhost:8010/api/assignments que cela fonctionne")
    },
        err => {
            console.log('Erreur de connexion: ', err);
        }).catch(e => console.log(e));

// Pour accepter les connexions cross-domain (CORS)
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Pour les formulaires
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200,
    allowedHeaders: ['x-access-token', 'content-type']
}));

let port = process.env.PORT || 8010;

// les routes
const prefix = '/api';

//TEACHER

app.route(prefix + '/teacher/register')
    .post(teacher.registerTeacher);

app.route(prefix + '/teacher/login')
    .post(teacher.loginTeacher);

app.route(prefix + '/teacher/:id')
    .get(teacher.getTeacherById);

app.route(prefix + '/teacher')
    .get(teacher.getTeacherByToken);

app.route(prefix + '/student/update')
    .post(teacher.updateTeacher);

//STUDENT

app.route(prefix + '/student/register')
    .post(student.registerStudent);

app.route(prefix + '/student/login')
    .post(student.loginStudent);

app.route(prefix + '/student/:id')
    .get(student.getStudentById);

app.route(prefix + '/student')
    .get(student.getStudentByToken);

app.route(prefix + '/student/update')
    .post(student.updateStudent);

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

app.route(prefix + '/subjects')
    .get(subject.getAllSubject);
//COMMENT

app.route(prefix + '/comment')
    .post(comment.postComment);

app.route(prefix + '/comments/:assignmentId')
    .get(comment.getComments);

//PEUPLER BDD
app.route(prefix + '/peuplerbdd')
    .post(setup_bdd.peuplerbdd);

// On démarre le serveur
app.listen(port, "0.0.0.0");
console.log('Serveur démarré sur http://localhost:' + port);

module.exports = app;