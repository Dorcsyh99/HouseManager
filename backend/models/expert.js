const mongoose = require("mongoose");
const bcrypt = require('bcrypt');


const uniqueValidator = require("mongoose-unique-validator");

const expertSchema = mongoose.Schema({
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, required: false},
  registrationDate: {type: Date, required: true},
  firstName: {type: String, required: true},
  lastName: {type: String, reuired: true},
  phone: {type: Number, required: false},
  image: {type: String, reqiured: false},
  field: {type: String, required: true},
  additionalFields: {type: Array, required: false}
});

expertSchema.plugin(uniqueValidator);

expertSchema.statics.hashPassword = function hashPassword(password){
  return bcrypt.hashSync(password, 10);
}

expertSchema.methods.isValid = function (hashedPassword){
  return bcrypt.compareSync(hashedPassword, this.password);
}

module.exports = mongoose.model("Expert", expertSchema);
