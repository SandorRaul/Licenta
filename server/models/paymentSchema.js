const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  countOrder: String,
  id: String,
  emailAccount: String,
  name: String,
  mobile: String,
  address: String,
  county: String,
  postalCode: String,
  details: String,
  typeOfPayment: {
    method: {
      type: String,
      enum: ["cash", "visa"], // Restrânge la aceste două valori
      required: true,
    },
  },
  cardDetails: {
    name: {
      type: String,
      default: null, // Să fie null dacă nu este folosit
    },
    cardNumber: {
      type: String,
      default: null,
    },
    CVV: {
      type: String,
      default: null,
    },
    expDate: {
      type: String,
      default: null,
    },
  },
  carts: Array,
  price: String,
});

const Payment = new mongoose.model("orders", paymentSchema);

module.exports = Payment;
