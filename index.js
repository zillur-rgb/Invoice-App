const cors = require("cors");
const express = require("express");
const app = express();
const invoiceRouter = require("./controllers/invoiceRouter");
app.use(express.json());
app.use(cors());
app.use(invoiceRouter);

// Home data
app.get("/", (req, res) => {
  res.send("<h1>Welcome welcome</h1>");
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
