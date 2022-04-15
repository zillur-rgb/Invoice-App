const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const url = process.env.MONGODB_URI;

mongoose
  .connect(url)
  .then((res) => console.log("Connected to MongoDB"))
  .catch((err) => console.log(`error connecting to MongoDB: ${err.message}`));

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  clientEmail: String,
  streetName: String,
  city: String,
  postcode: Number,
  country: String,
  projectDes: String,
  price: Number,
  status: String,
  date: Date,
  due: Date,
});

invoiceSchema.set("toJSON", {
  transform: (document, returendObject) => {
    returendObject.id = returendObject._id.toString();
    delete returendObject._id;
    delete returendObject.__v;
  },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
