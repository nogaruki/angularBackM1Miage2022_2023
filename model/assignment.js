let mongoose = require("mongoose");
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
 id: Number,
 dateDeRendu: Date,
 nom: String,
 rendu: Boolean,
 note: Number,
 subject_id: Number,
 teacher_id: Number,
 student_id: Number
});
AssignmentSchema.plugin(aggregatePaginate);
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Assignment", AssignmentSchema);
