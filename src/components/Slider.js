import React, { useState, useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import Link from "next/link";
import { TopRated } from "./watchListLabels/TopRated";
import { SEARCH_IMG } from "../../Config";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import Image from "next/image";

function Slider({ movies, type }) {
  const [swiperRef, setSwiperRef] = useState();
  
  const handleLeftClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slidePrev();
  }, [swiperRef]);

  const handleRightClick = useCallback(() => {
    if (!swiperRef) return;
    swiperRef.slideNext();
  }, [swiperRef]);

  return (
    <div className="relative">
      <div className="leftarrow font-bold !bg-pink ">
        {/* slider left button */}
        <button
          onClick={handleLeftClick}
          className="absolute -left-6 z-10 bg-black/30 2xl:visible xl:!visible !invisible -translate-y-1/2 border px-1 py-3 rounded top-1/2 text-white  hover:!text-amber-400"
        >
          <ChevronLeftIcon className="w-11 h-11 flex !font-bold" />
        </button>
      </div>
      {/* slider container */}
      <Swiper
        onSwiper={setSwiperRef}
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
                      <Image
                        className=""
                        src={`${SEARCH_IMG}/original/${movie.poster_path}`}
                        alt="img"
                        width="250px"
                        height="397px"
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
      {/* slider right button */}
      <div className="leftarrow font-bold !bg-pink ">
        <button
          onClick={handleRightClick}
          className="absolute -right-6 z-10 bg-black/30 2xl:visible xl:!visible !invisible -translate-y-1/2 border px-1 py-3 rounded top-1/2 text-white  hover:!text-amber-400"
        >
          <ChevronRightIcon className="w-11 h-11 flex !font-bold" />
        </button>
      </div>
    </div>
  );
}

export default Slider;
