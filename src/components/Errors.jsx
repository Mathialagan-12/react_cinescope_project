import React from "react";

const Errors = ({ message }) => {
  return (
    <div className="error">
      <span>⛔</span> {message}
    </div>
  );
};

export default Errors;
