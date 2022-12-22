let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let User = Schema({
 id: Number,
 username: String,
 password: String,
 prenom: String,
 nom: String
});
// C'est à travers ce modèle Mongoose qu'on pourra faire le CRUD
module.exports = mongoose.model("User", User);
