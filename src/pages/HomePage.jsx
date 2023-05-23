import React from "react";
import Banner from "../components/banner/Banner";
import Header from "../components/layout/Header";
import MovieList from "../components/movies/MovieList";

const HomePage = () => {
  return (
    <>
      <Banner></Banner>
      <section className="movie-layout page-container">
        <h2 className="now-playing text-white text-2xl font-bold mb-4">
          Now playing
        </h2>
        <MovieList></MovieList>
        <h2 className="now-playing text-white text-2xl font-bold mb-4">
          Top Rated
        </h2>
        <MovieList type="top_rated"></MovieList>
        <h2 className="now-playing text-white text-2xl font-bold mb-4">
          Trending
        </h2>
        <MovieList type="popular"></MovieList>
      </section>
    </>
  );
};

export default HomePage;
