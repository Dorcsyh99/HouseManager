const mongoose = require("mongoose");

const propSchema = mongoose.Schema({
  city: {type: String, required: true},
  city2: {type: String, required: false}, // kerület
  address: { type: String, required: true },
  price: {type: Number, required: false},
  type: { type: String, required: false }, //select
  size: {type: Number, required: false},
  numberOfRooms: {type: Number, required: false},
  condition: {type: String, required: false}, //select
  elevator: {type: Boolean, required: false},
  level: {type: Number, required: false},
  year: {type: Number, required: false},
  garden: {type: Boolean, required: false},
  attic: {type: Boolean, required: false},
  parking: {type: String, required: false},
  furnitured: {type: Boolean, required: false},
  pet: {type: Boolean, required: false},
  smoke: {type: Boolean, required: false},
  heatingType: {type: String, required: false}, //select
  image: { type: String, required: false },
  description: {type: String, required: false},
  featured: {type: Boolean, required: false},
  creator: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

module.exports = mongoose.model("Property", propSchema);


// mongo "mongodb+srv://cluster0-fwp6n.azure.mongodb.net/test"  --username Admin
