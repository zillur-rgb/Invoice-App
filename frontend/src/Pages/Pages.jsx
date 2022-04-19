import React from "react";
import { Routes, Route } from "react-router-dom";
import GetDetails from "./GetDetails/GetDetails";
import Homepage from "./Homepage";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:invoiceId" element={<GetDetails />} />
      </Routes>
    </div>
  );
};

export default Pages;
