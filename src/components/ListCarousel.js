import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Heading from "./Heading";
import Slider from "./Slider";
import { IMAGE_END, TMDB_KEY, IMAGE_START } from "../../Config";

const ListCarousel = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    fetch(`${IMAGE_START}/popular?api_key=${TMDB_KEY}&${IMAGE_END}`)
      .then((res) => res.json())
      .then((data) => setPopularMovies(data.results));
  }, []);

  useEffect(() => {
    fetch(` ${IMAGE_START}/top_rated?api_key=${TMDB_KEY}&${IMAGE_END}`)
      .then((res) => res.json())
      .then((data) => setTopMovies(data.results));
  }, []);
  // console.log(popularMovies, "popularMovies");
  // console.log(topMovies, "topMovies");
  return (
    <>
      <div className="container ">
        <div className=" sm:w-full p-3">
          <Heading heading=" Featured Popular" />
          <Slider movies={popularMovies} type="popular" />
        </div>

        <div className="mt-10  p-3 ">
          <Heading heading="Featured Top Rated" />
          <Slider movies={topMovies} />
        </div>
      </div>
    </>
  );
};

export default ListCarousel;

 