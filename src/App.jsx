import { Fragment } from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import Banner from "./components/banner/Banner";
import MovieList from "./components/movies/MovieList";
import "swiper/css";
import Main from "./components/layout/Main";
import HomePage from "./pages/HomePage";
import MoviePage from "./pages/MoviePage";
import MovieDetailsPage from "./pages/MovieDetailsPage";

function App() {
  return (
    <Fragment>
      <Routes>
        <Route element={<Main></Main>}>
          <Route path="/" element={<HomePage></HomePage>}></Route>
          <Route path="/movies" element={<MoviePage></MoviePage>}></Route>
          <Route
            path="/movie/:id"
            element={<MovieDetailsPage></MovieDetailsPage>}
          ></Route>
        </Route>
      </Routes>
    </Fragment>
  );
}

export default App;
