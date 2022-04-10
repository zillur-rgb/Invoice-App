const dotenv = require("dotenv").config();
const Invoice = require("./models/invoice");
const express = require("express");
const app = express();
app.use(express.json());

//Get All Data
app.get("/api/invoices", (req, res) => {
  Invoice.find({}).then((invoice) => res.json(invoice));
});

//Get Single Data
app.get("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);
  Invoice.findById(req.params.id).then((invoice) => res.json(invoice));
});

//Delete Single Data

app.delete("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);

  Invoice.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});

//Post New Data
app.post("/api/invoices", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const newInvoice = new Invoice({
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    streetName: body.streetName,
    city: body.city,
    postcode: body.postcode,
    country: body.country,
    projectDes: body.projectDes,
    price: body.price,
  });

  newInvoice.save().then((savedNote) => res.json(savedNote));
});

// Updating Data

app.put("/api/invoices/:id", (req, res) => {
  const body = req.body;

  const invoice = {
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    streetName: body.streetName,
    city: body.city,
    postcode: body.postcode,
    country: body.country,
    projectDes: body.projectDes,
    price: body.price,
  };

  Invoice.findByIdAndUpdate(req.params.id, invoice, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => console.log(err.message));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
