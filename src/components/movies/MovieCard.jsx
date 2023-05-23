import React from "react";
import { useNavigate } from "react-router-dom";

const MovieCard = ({ item }) => {
  const navigator = useNavigate();
  const { title, poster_path, release_date, vote_average, id } = item;
  return (
    <div className="movie-card rounded-lg bg-slate-800 p-3 text-white h-full flex flex-col selection:none">
      <img
        src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
        alt=""
        className="w-full h-[300px] rounded-lg"
      />
      <div className="flex flex-col flex-1">
        <h2 className="text-xl mb-4 mt-4 text-white">{title}</h2>
        <div className="tag flex justify-between text-sm opacity-25 mb-4">
          <span>{new Date(release_date).getFullYear()}</span>
          <span>{vote_average}</span>
        </div>
        <button
          onClick={() => navigator(`/movie/${id}`)}
          className="w-full py-2 bg-primary text-white rounded-lg mt-auto"
        >
          Watch now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
