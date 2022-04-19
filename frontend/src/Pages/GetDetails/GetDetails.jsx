import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./GetDetails.css";

const GetDetails = () => {
  const [details, getDetails] = useState({});
  const params = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/invoices/${params.invoiceId}`)
      .then((res) => {
        getDetails(res.data);
      });
  }, [params.invoiceId]);
  console.log(details);

  return (
    <div className="detailsContainer">
      <header className="detailsHeader">
        <div className=" ">
          <h1>Details</h1>
          <div className="status">
            <p
              className={
                details.status === "Expired"
                  ? "expired"
                  : details.status === "Pending"
                  ? "pending"
                  : "paid"
              }
            >
              {details.status}
            </p>
          </div>
        </div>

        <div className="right-btns">
          <button className="edit">Edit</button>
          <button
            className={
              details.status === "Expired"
                ? "expired"
                : details.status === "Pending"
                ? "pending"
                : "paid"
            }
          >
            {details.status === "Expired"
              ? "Expired"
              : details.status === "Pending"
              ? "Mark as Paid"
              : "Paid"}
          </button>
        </div>
      </header>

      <main>
        <div className="main-header">
          <h1>Invoice for</h1>
          <div className="due">
            <p>Due Date</p>
            <p className="due">{details.due}</p>
          </div>
        </div>
        <div className="details">
          <p
            style={{
              fontWeight: "700",
              fontSize: "18px",
              color: "#3A5A40",
            }}
          >
            {details.clientName}
          </p>
          <p>{details.clientEmail}</p>
          <p>
            {details.streetName}, {details.city}, {details.postcode},{" "}
            {details.country}
          </p>
        </div>
        <h1 className="desTitle">Project Description</h1>
        <div className="projectDes">
          <ul>
            <ol>
              <p>{details.projectDes}</p>
            </ol>
          </ul>
          <p>€{details.price}</p>
        </div>
        <div className="border"></div>
        <p className="amount">
          Amount to Pay <span>€{details.price}</span>
        </p>
      </main>
    </div>
  );
};

export default GetDetails;
