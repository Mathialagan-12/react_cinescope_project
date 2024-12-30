import { useEffect, useState } from "react";
import Header from "./components/Headers/Header";
import MainContent from "./components/MainFiles/MainContent";
import Logo from "./components/Headers/Logo";
import Search from "./components/Headers/Search";
import NumResult from "./components/Headers/NumResult";
import Box from "./components/MainFiles/Box";
import LeftItem from "./components/MainFiles/Box 1/LeftItem";
import RightItem from "./components/MainFiles/Box 2/RightItem";
import Loading from "./components/Loading";
import Errors from "./components/Errors";
import MovieDetails from "./components/MovieDetails";
import useMovies from "./custom hooks/useMovies";
import useLocalStorge from "./custom hooks/useLocalStorge";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

export default function App() {
  const [query, setQuery] = useState("");

  const [selectedId, setSelectedId] = useState(null);
  const { movies, isLoading, error, Key } = useMovies(query, handleBack);
  const [watched, setWatched] = useLocalStorge([], "watched");

  function handleSelectedMovie(id) {
    setSelectedId((selectId) => (selectId === id ? null : id));
  }

  function handleBack() {
    setSelectedId(null);
  }

  function handleAddMovie(movie) {
    setWatched((movies) => [...movies, movie]);
  }

  function handleDelete(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbId !== id));
    console.log(id);
  }

  return (
    <>
      <Header>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResult movies={movies} />
      </Header>

      <MainContent>
        <Box>
          {!error && !isLoading && (
            <LeftItem
              movies={movies}
              handleSelectedMovie={handleSelectedMovie}
            />
          )}
          {isLoading && <Loading />}
          {error && <Errors message={error} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              Key={Key}
              handleBack={handleBack}
              handleAddMovie={handleAddMovie}
              watched={watched}
            />
          ) : (
            <RightItem watched={watched} handleDelete={handleDelete} />
          )}
        </Box>
      </MainContent>
    </>
  );
}
