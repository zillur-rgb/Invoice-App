const invoiceRouter = require("express").Router();

const Invoice = require("../models/invoice");

//Get All Data
invoiceRouter.get("/api/invoices", (req, res) => {
  Invoice.find({}).then((invoice) => res.json(invoice));
});

//Get Single Data
invoiceRouter.get("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);
  Invoice.findById(req.params.id).then((invoice) => res.json(invoice));
});

//Delete Single Data

invoiceRouter.delete("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);

  Invoice.findByIdAndDelete(req.params.id).then(() => res.status(204).end());
});

//Post New Data
invoiceRouter.post("/api/invoices", (req, res) => {
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  console.log(body);
  const date = new Date();
  const dueDate = date.setMonth(date.getMonth() + 1);
  const status =
    dueDate < new Date()
      ? "Expired"
      : date === new Date()
      ? "Paid"
      : date > new Date()
      ? "Pending"
      : "";

  const newInvoice = new Invoice({
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    streetName: body.streetName,
    city: body.city,
    postcode: body.postcode,
    country: body.country,
    projectDes: body.projectDes,
    price: body.price,
    status: body.status ? body.status : status,
    date: new Date(),
    due: date,
  });

  newInvoice.save().then((savedNote) => res.json(savedNote));
});

// Updating Data

invoiceRouter.put("/api/invoices/:id", (req, res) => {
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
    status: body.status,
    date: body.date,
    due: body.due,
  };

  Invoice.findByIdAndUpdate(req.params.id, invoice, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => console.log(err.message));
});

module.exports = invoiceRouter;
