import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
// import Star from "./Star";
import "./index.css";
import App from "./App.jsx";

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);

//   return (
//     <div>
//       <Star
//         color="blue"
//         size={40}
//         className="test"
//         defaultRating={0}
//         maxRating={10}
//         onSetRating={setMovieRating}
//       />
//       <p>The movie was rated {movieRating} Stars</p>
//     </div>
//   );
// }

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
    {/* <Star
      maxRating={5}
      color="red"
      size={40}
      className="test"
      defaultRating={3}
      message={["terrible", "bad", "okay", "good", "amazing"]}
    />

    <Test /> */}
  </StrictMode>
);
