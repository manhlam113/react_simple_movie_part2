import React from "react";
import useSWR from "swr";
import { SwiperSlide, Swiper } from "swiper/react";
import { fetcher } from "../../config";
import "swiper/css";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=a62c386893743ed30c91c0306c224075&language=en-US&page=1`,
    fetcher
  );
  const movies = data?.results || [];
  console.log("Movies....", movies);
  return (
    <section className="banner max-w-[1280px] h-[400px] mx-auto mb-10 overflow-hidden">
      <Swiper grabCursor="true" slidesPerView={"auto"}>
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide>
              <BannerItem key={item.id} item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

const BannerItem = ({ item }) => {
  const { title, backdrop_path } = item;
  return (
    <div className="h-full w-full relative">
      <div className="absolute inset-0 bg-black opacity-25 z-10 rounded-lg shadow-md"></div>
      <img
        src={`https://image.tmdb.org/t/p/original/${backdrop_path}`}
        alt=""
        className="h-full w-full rounded-lg object-cover shadow-md"
      />
      <div className="absolute left-5 bottom-5 w-full text-white z-20">
        <h2 className="text-5xl font-semibold mb-4">{title}</h2>
        <div className="tag flex gap-x-4 mt-4 mb-6">
          <span className="px-6 py-2 rounded-md border border-white">
            Advender
          </span>
          <span className="px-6 py-2 rounded-md border border-white">
            Advender
          </span>
          <span className="px-6 py-2 rounded-md border border-white">
            Advender
          </span>
        </div>
        <div className="btn-watch">
          <button className="px-6 py-2 rounded-md bg-primary text-white">
            Watch more
          </button>
        </div>
      </div>
    </div>
  );
};
export default Banner;
