import React from "react";
import "./SingleCard.css";
import { MdKeyboardArrowRight } from "react-icons/md";

const SingleCard = ({ invoice }) => {
  console.log(invoice);
  const getMonth = +invoice.date[0] + 3;
  console.log(getMonth);
  return (
    <div className="card">
      <p className="id">#{invoice.id.slice(invoice.id.length - 4)}</p>
      <p className="dueDate">Due {invoice.due ? invoice.due : "12/12/2022"}</p>
      <p className="client">{invoice.clientName}</p>
      <p className="price">{invoice.price}</p>
      <button className="arrow">
        <MdKeyboardArrowRight />
      </button>
    </div>
  );
};

export default SingleCard;
