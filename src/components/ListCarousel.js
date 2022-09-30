import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Heading from "./Heading";
import Slider from "./Slider";
import { IMAGE_END, TMDB_KEY, IMAGE_START } from "../../Config";
import useFetch from "../../useFetch";

const ListCarousel = () => {
  const { movies } = useFetch(
    `${IMAGE_START}/popular?api_key=${TMDB_KEY}&${IMAGE_END}`
  );
  const popularMovies = movies;

  const { movies: top } = useFetch(
    ` ${IMAGE_START}/top_rated?api_key=${TMDB_KEY}&${IMAGE_END}`
  );
  const topMovies = top;
   
  return (
    <>
      <div className="container ">
        {/* Popular Movies Carousel */}
        <div className=" sm:w-full p-3">
          <Heading heading=" Featured Popular" />
          <Slider movies={popularMovies} type="popular" />
        </div>
        {/* Top Movies Carousel */}
        <div className="mt-10  p-3 ">
          <Heading heading="Featured Top Rated" />
          <Slider movies={topMovies} />
        </div>
      </div>
    </>
  );
};

export default ListCarousel;
