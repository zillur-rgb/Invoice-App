const cors = require("cors");
const express = require("express");
const app = express();
const invoiceRouter = require("./controllers/invoiceRouter");
app.use(express.json());
app.use(cors());
app.use(invoiceRouter);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
