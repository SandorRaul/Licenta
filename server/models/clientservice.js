const mongoose = require("mongoose");

const customerservice = new mongoose.Schema({
  email: String,
  orderNumber: String,
  message: String,
});

const Clienthelp = new mongoose.model("clientservices", customerservice);

module.exports = Clienthelp;
