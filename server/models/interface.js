const mongoose = require("mongoose");

const interface_front = new mongoose.Schema({
  id: String,
  size: Array,
  material: Array,
  color: Array,
  category: Array,
  gender: Array,
});

const Interface = new mongoose.model("frontend_elements", interface_front);

module.exports = Interface;
