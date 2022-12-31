let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let Teacher = Schema({
 username: String,
 email: String,
 picture: String, //URL
 password: String,
 prenom: String,
 nom: String
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("Teacher", Teacher);
