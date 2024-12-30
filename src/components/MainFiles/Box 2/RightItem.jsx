import React from "react";
import Summary from "./Summary";
import Watched from "./Watched";

const RightItem = ({ watched, handleDelete }) => {
  return (
    <>
      <Summary watched={watched} />
      <Watched watched={watched} handleDelete={handleDelete} />
    </>
  );
};

export default RightItem;
