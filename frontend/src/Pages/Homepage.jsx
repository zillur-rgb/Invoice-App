import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";

const Homepage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/invoices").then((res) => {
      setInvoices(res.data);
    });
  }, []);
  return (
    <div>
      <h1>This is Homepage</h1>
    </div>
  );
};

export default Homepage;
