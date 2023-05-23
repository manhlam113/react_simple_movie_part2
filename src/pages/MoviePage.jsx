import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../config";

const MoviePage = () => {
  const navigator = useNavigate();
  const [filterChange, setFilterChange] = useState("");
  const [url, setUrl] = useState(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=a62c386893743ed30c91c0306c224075&language=en-US&page=1`
  );
  const handleFilterChange = (e) => {
    setTimeout(() => {
      setFilterChange(e.target.value);
    }, 5000);
  };
  useEffect(() => {
    if (filterChange) {
      setUrl(
        `https://api.themoviedb.org/3/search/movie?api_key=a62c386893743ed30c91c0306c224075&language=en-US&page=1&include_adult=false&query=${filterChange}`
      );
    } else {
      setUrl(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=a62c386893743ed30c91c0306c224075&language=en-US&page=1"
      );
    }
  }, [filterChange]);
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;
  const movies = data?.results || [];
  console.log(movies);
  return (
    <div className="py-10 page-container">
      <div className="mb-10">
        <div className="flex">
          <input
            type="text"
            className="w-full p-4 outline-none bg-slate-800 text-white"
            placeholder="Enter your movie..."
            onChange={(e) => handleFilterChange(e)}
          />
          <button className="bg-primary p-4 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      {loading && (
        <div
          className="w-10 h-10 rounded-full border border-t-4 border-t-transparent border-primary
          animate-spin mx-auto mb-10
        "
        ></div>
      )}
      <div className="grid grid-cols-4 gap-x-10 gap-y-10">
        {movies.length > 0 &&
          movies.map((item) => (
            <div className="movie-card rounded-lg bg-slate-800 p-3 text-white h-full flex flex-col selection:none">
              <img
                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                alt=""
                className="w-full h-[300px] rounded-lg"
              />
              <div className="flex flex-col flex-1">
                <h2 className="text-xl mb-4 mt-4 text-white">{item.title}</h2>
                <div className="tag flex justify-between text-sm opacity-25 mb-4">
                  <span>{new Date(item.release_date).getFullYear()}</span>
                  <span>{item.vote_average}</span>
                </div>
                <button
                  onClick={() => navigator(`/movie/${item.id}`)}
                  className="w-full py-2 bg-primary text-white rounded-lg mt-auto"
                >
                  Watch now
                </button>
              </div>
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center text-white py-10 gap-x-2">
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
            />
          </svg>
        </span>
        <span className="rounded bg-white px-4 py-2 text-black leading-none">
          1
        </span>
        <span className="cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
            />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default MoviePage;
