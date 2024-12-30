import React, { useEffect, useRef, useState } from "react";
import Star from "../Star";
import Loading from "./Loading";
import useKey from "../custom hooks/useKey";

const MovieDetails = ({
  selectedId,
  handleBack,
  Key,
  handleAddMovie,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const count = useRef(0);

  const isWatched = watched.map((movie) => movie.imdbId).includes(selectedId);

  const userWatchedRating = watched.find(
    (movie) => movie.imdbId === selectedId
  )?.userRating;

  function handleWatchedMovie() {
    const newWatchedMovie = {
      imdbId: selectedId,
      imdbRating: Number(imdbRating),
      title,
      year,
      poster,
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
      countedTime: count.current,
    };

    handleAddMovie(newWatchedMovie);
    handleBack();
  }

  const {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Actors: actors,
    Released: released,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    if (userRating) {
      count.current = count.current + 1;
    }
  }, [userRating]);

  useKey("Escape", handleBack);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie| ${title}`;

    return function () {
      document.title = "Popcorn";
    };
  }, [title]);

  useEffect(() => {
    async function getMovies() {
      setIsLoading(true);
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${Key}&i=${selectedId}`
      );
      const data = await res.json();
      setMovie(data);
      setIsLoading(false);
    }

    getMovies();
  }, [selectedId]);

  return (
    <div className="details">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={handleBack}>
              ⬅️
            </button>
            <img src={poster} alt={title} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} & {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} imdb Rating
              </p>
            </div>
          </header>

          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <Star maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleWatchedMovie}>
                      + Add List
                    </button>
                  )}
                </>
              ) : (
                <p>your already rate this movie for {userWatchedRating}.</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director} </p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;
