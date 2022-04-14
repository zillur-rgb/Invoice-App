import React from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./Homepage";

const Pages = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </div>
  );
};

export default Pages;
