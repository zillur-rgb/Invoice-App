import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import SingleCard from "../Components/SingleCard/SingleCard";

const Homepage = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/api/invoices").then((res) => {
      setInvoices(res.data);
    });
  }, []);
  return (
    <div className="content">
      <header>
        <div className="title">
          <h1>Invoices</h1>
          <p>There are currently {invoices.length} Invoices Available</p>
        </div>
        <button className="newBtn">
          <BsPlusCircleFill
            style={{ color: "#3A5A40", fontSize: "31px", marginRight: "10px" }}
          />{" "}
          <p>New Invoices</p>
        </button>
      </header>

      <main>
        {invoices.map((invoice) => {
          return <SingleCard key={invoice.id} invoice={invoice} />;
        })}
      </main>
    </div>
  );
};

export default Homepage;
