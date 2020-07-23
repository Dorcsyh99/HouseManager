const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const uniqueValidator = require("mongoose-unique-validator");

const userSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: false},
  registrationDate: {type: Date, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, reuired: true},
  jobTitle: {type: String, required: false},
  phone: {type: Number, required: false},
  image: {type: String, reqiured: false},
  uploadedProperties: {type: Number, required: false}
});

userSchema.plugin(uniqueValidator);

userSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password, 10);
}

userSchema.methods.isValid = function (hashedPassword){
  return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model("User", userSchema);
