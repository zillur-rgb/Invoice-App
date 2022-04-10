const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const url = `mongodb+srv://zillurclub:12345@cluster0.bo37i.mongodb.net/invoiceDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const invoiceSchema = new mongoose.Schema({
  clientName: String,
  clientEmail: String,
  streetName: String,
  city: String,
  postcode: Number,
  country: String,
  projectDes: String,
  price: Number,
});

const Invoice = mongoose.model("Note", invoiceSchema);

const app = express();
app.use(express.json());

let invoices = [
  {
    id: 1,
    clientName: "Andrew Mark",
    clientEmail: "andrew@gmail.com",
    streetName: "Robinstr 124",
    city: "Brentford",
    postcode: 12876,
    country: "United Kingdom",
    projectDes: "Graphic Design",
    price: 981,
  },
  {
    id: 2,
    clientName: "Mac O Shane",
    clientEmail: "shane@gmail.com",
    streetName: "Main str 23",
    city: "Southampton",
    postcode: 55441,
    country: "Germany",
    projectDes: "Web Design",
    price: 1234,
  },
  {
    id: 3,
    clientName: "Jason Mister",
    clientEmail: "jason@gmail.com",
    streetName: "Kaiser str 124",
    city: "Dortmund",
    postcode: 32415,
    country: "Sweden",
    projectDes: "Döner",
    price: 23,
  },
];

app.get("/api/invoices", (req, res) => {
  res.json(invoices);
});

app.get("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);
  const singleData = invoices.find((d) => d.id === id);

  if (singleData) {
    res.json(singleData);
  } else {
    res.status(404).end();
  }
});

app.delete("/api/invoices/:id", (req, res) => {
  const id = Number(req.params.id);
  invoices = invoices.filter((invoice) => invoice.id !== id);
  res.status(204).end();
});

app.post("/api/invoices", (req, res) => {
  const generateId = () => {
    const maxId =
      invoices.length > 0
        ? Math.max(...invoices.map((invoice) => invoice.id))
        : 0;

    return maxId + 1;
  };
  const body = req.body;

  if (!body) {
    return res.status(400).json({
      error: "Content Missing",
    });
  }

  const newInvoice = {
    id: generateId(),
    clientName: body.clientName,
    clientEmail: body.clientEmail,
    streetName: body.streetName,
    city: body.city,
    postcode: body.postcode,
    country: body.country,
    projectDes: body.projectDes,
    price: body.price,
  };

  invoices = invoices.concat(newInvoice);
  res.json(newInvoice);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
