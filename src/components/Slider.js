import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { TopRated } from "./watchListLabels/TopRated";
import { IMAGE_PATH } from "../../Config";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/outline";
function Slider({ movies, type }) {
  const [swiperRef, setSwiperRef] = useState();
  console.log(movies, "movies in swiper");
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <div>
      <div className="leftarrow font-bold !bg-pink "> 
        <button onClick={handleLeftClick}>button
          <ChevronLeftIcon  />
        </button>
      </div>
      <Swiper
        slidesPerView={6}
        spaceBetween={20}
        slidesPerGroup={6}
        navigation={false}
        modules={[Pagination, Autoplay, EffectFade, Navigation]}
        className="mySwiper  "
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        hashNavigation={true}
        breakpoints={{
          350: {
            slidesPerView: 1.5,
            spaceBetween: 20,
          },
          480: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          640: {
            slidesPerView: 2.5,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3.5,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4.5,
            spaceBetween: 20,
          },
          1880: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
        }}
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            {type && type == "popular" ? (
              <Link href={`/movieDetail/${movie.id}`}>
                <a>
                  <div className="flex hover:opacity-90 flex-col">
                    <div className="">
                      <img
                        className=""
                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                        alt="img"
                      />
                    </div>

                    <div className="">
                      <div className="hover:underline mt-3 font-bold text-large">
                        {movie ? movie.original_title : ""}
                      </div>
                    </div>
                  </div>
                </a>
              </Link>
            ) : (
              <TopRated movie={movie} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="leftarrow font-bold !bg-pink "> 
        <button onClick={handleLeftClick}>button
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
}

export default Slider;
