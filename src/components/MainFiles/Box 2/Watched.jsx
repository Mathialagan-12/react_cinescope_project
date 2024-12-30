import React from "react";
import WatchList from "./WatchList";

const Watched = ({ watched, handleDelete }) => {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchList
          movie={movie}
          handleDelete={handleDelete}
          key={movie.imdbId}
        />
      ))}
    </ul>
  );
};

export default Watched;
