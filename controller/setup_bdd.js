let Assignment = require('../model/assignment');
let Teacher = require('../model/teacher');
let Student = require('../model/student');
let Subject = require('../model/subject');
let Comment = require('../model/comment');

let commentsToAdd = require('../BDD scripts/commentsToAdd.json');
let teachersToAdd = require('../BDD scripts/teachersToAdd.json');
let subjectsToAdd = require('../BDD scripts/subjectsToAdd.json');
let studentsToAdd = require('../BDD scripts/studentsToAdd.json');
let assignmentsToAdd = require('../BDD scripts/assignmentsToAdd.json');


function peuplerbdd(req, res) {
    console.log("Peuplement de la bdd ...");

    //addTeachers(teachersToAdd);
    //addComments(commentsToAdd);
    //addSubjects(subjectsToAdd);
    //addStudents(studentsToAdd);
    //addAssignments(assignmentsToAdd);


    res.status(200).send({message : "La bdd est peuplé !"});
}

function addComments(tab) {
    tab.forEach(element => {
        let newComment = new Comment();
        newComment.id = element.id;
        newComment.teacher_id = element.teacher_id;
        newComment.assignment_id = element.assignment_id;
        newComment.comment = element.comment;

        newComment.save((err) => {
            if (err) {
                console.log('cant save comment ', err);
            } else {
                console.log('saving comment ' + newComment.id);
            }
        })
    })
}

function addTeachers(tab) {
    tab.forEach(element => {
        let newTeacher = new Teacher();
        newTeacher.email = element.email;
        newTeacher.picture = element.picture;
        newTeacher.password = element.password;
        newTeacher.prenom = element.prenom;
        newTeacher.nom = element.nom;

        newTeacher.save((err) => {
            if (err) {
                console.log('cant save teacher ', err);
            } else {
                console.log('saving teacher ' + newTeacher.id);
            }
        })
    })
}

function addStudents(tab) {
    tab.forEach(element => {
        let newStudent = new Student();
        newStudent.username = element.username;
        newStudent.email = element.email;
        newStudent.password = element.password;
        newStudent.prenom = element.prenom;
        newStudent.nom = element.nom;

        newStudent.save((err) => {
            if (err) {
                console.log('cant save student ', err);
            } else {
                console.log('saving student ' + newStudent.id);
            }
        })
    })
}

function addSubjects(tab) {
    tab.forEach(element => {
        let newSubject = new Subject();
        newSubject.id = element.id;
        newSubject.title = element.title;
        newSubject.picture = element.picture;
        newSubject.teacher_id = element.teacher_id;

        newSubject.save((err) => {
            if (err) {
                console.log('cant save subject ', err);
            } else {
                console.log('saving subject ' + newSubject.id);
            }
        })
    })
}

function addAssignments(tab) {
    tab.forEach(element => {
        let newAssignment = new Assignment();
        newAssignment.id = element.id;
        newAssignment.dateDeRendu = Date.now();
        newAssignment.nom = element.nom;
        newAssignment.note = element.note;
        newAssignment.subject_id = element.subject_id;
        newAssignment.teacher_id = element.teacher_id;
        newAssignment.students_id = element.students_id;

        newAssignment.save((err) => {
            if (err) {
                console.log('cant save assignment ', err);
            } else {
                console.log('saving assignment ' + newAssignment.id);
            }
        })
    })
}

module.exports = { peuplerbdd };