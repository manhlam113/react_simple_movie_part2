import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";

import useSWR from "swr";
import MovieCard from "../components/movies/MovieCard";
import { api_key, fetcher } from "../config";

const MovieDetailsPage = () => {
  const params = useParams();
  const movieId = params.id;
  //   console.log("MoviesId", movieId);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`,
    fetcher
  );
  const movie = data || [];
  const { genres } = movie;
  console.log(movie);

  return (
    <div className="p-10">
      <div className="w-full h-[600px] relative">
        <div className="overlay bg-black bg-opacity-70 absolute inset-0"></div>
        <div
          className="h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
          }}
        ></div>
      </div>
      <div className="max-w-[800px] h-[300px] mx-auto -mt-[200px] z-10 relative mb-10">
        <img
          src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
          alt=""
          className="h-full w-full object-cover rounded-lg"
        />
      </div>
      <h2 className="text-white text-5xl font-bold text-center mb-10">
        {movie.title}
      </h2>
      <div className="grid grid-cols-3 gap-x-10 max-w-[500px] mx-auto text-primary mb-10">
        {genres?.map((item) => (
          <span className="border border-primary px-6 py-2 rounded-md text-center">
            {item.name}
          </span>
        ))}
      </div>
      <p className="desc text-center mx-auto text-white mb-10 max-w-[700px]">
        {movie.overview}
      </p>
      <MovieCast></MovieCast>
      <MovieVideo></MovieVideo>
      <MovieSimilar></MovieSimilar>
    </div>
  );
};
const MovieCast = () => {
  const params = useParams();
  const movieId = params.id;

  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${api_key}&language=en-US`,
    fetcher
  );
  console.log("DataMkovie cast", data);
  if (!data) return null;
  const { cast } = data;
  return (
    <>
      <h1 className="text-center text-4xl text-white mb-10">Casts</h1>
      <div className="grid grid-cols-4 gap-x-10">
        {cast.length > 0 &&
          cast.slice(0, 4).map((item) => (
            <div className="w-full h-[400px] rounded-md">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.profile_path}`}
                alt=""
                className="w-full h-full rounded-md"
              />
              <p className="text-white text-center text-2xl font-semibold p-4">
                {item.name}
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

const MovieVideo = () => {
  const params = useParams();
  const movieId = params.id;
  //   console.log("MoviesId", movieId);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${api_key}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  console.log(results);
  return (
    <div className="py-10">
      {results.slice(0, 3).map((item) => (
        <div key={item.id} className="mt-10 w-full">
          <h3 className="px-10 py-4 rounded-md bg-primary inline-block text-white mb-4">
            {item.name}
          </h3>
          <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${item.key}`}
            title="Highlights | PHÁP vs BA LAN | Kỷ lục Giroud, siêu phẩm Mbappe | World Cup 2022"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            className="w-full"
          ></iframe>
        </div>
      ))}
    </div>
  );
};

const MovieSimilar = () => {
  const params = useParams();
  const movieId = params.id;
  //   console.log("MoviesId", movieId);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${api_key}&language=en-US`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  console.log(results);
  return (
    <>
      <h3 className="text-white text-4xl font-semibold mb-4">Similar Movie</h3>
      <div className="movie-list mb-10">
        <Swiper grabCursor="true" slidesPerView={"auto"}>
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item}></MovieCard>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </>
  );
};
export default MovieDetailsPage;
