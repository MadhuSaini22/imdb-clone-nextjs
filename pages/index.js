/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
import loader from "../src/assets/1544764567.svg";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { AddWatch } from "../src/components/watchListLabels/AddWatch";
import ListCarousel from "../src/components/ListCarousel";
import {
  IMAGE_END,
  IMAGE_PATH,
  IMAGE_START,
  TMDB_KEY,
  SEARCH_IMG,
} from "../Config.js";
import Link from "next/link";

function Home(props) {
  const { popularMovies, upcomingMovies } = props;
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className=" lg:container ">
        <div className="lg:w-full ">
          <div className="">
            <div className="grid grid-cols-12 gap-1 md:px-4 sm:px-4 py-2">
              <div className="lg:col-span-8 md:col-span-7 lg:px-0 px-3 col-span-12">
                <Swiper
                  slidesPerView={1}
                  spaceBetween={30}
                  loop={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }}
                  navigation={true}
                  modules={[Pagination, EffectFade, Autoplay, Navigation]}
                  className="mySwiper hover:opacity-95"
                >
                  {popularMovies.map((movie) => (
                    <SwiperSlide key={movie.id}>
                      <AddWatch key={movie.id} movie={movie} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

              <div className="lg:col-span-4 md:col-span-5  col-span-12  mx-2 ">
                <p className=" text-yellow-400 mb-4 font-bold text-title-main">
                  Up next
                </p>
                <div className=" bg-dark-gr bg-gradient-to-b1 from-gray-9001 px-3 ">
                  {upcomingMovies.map((movie) => (
                    <div key={movie.id} className="grid grid-cols-4 gap-2 ">
                      <div className="col-span-1 ">
                        <img
                          className="p-1 pb-3 h-[125px]"
                          src={`  ${SEARCH_IMG}/original/${
                            movie ? movie.poster_path : ""
                          }`}
                          alt="img"
                        />
                      </div>

                      <div className="col-span-3 cursor-pointer group max-w-xs p-1  ">
                        <Link href={`/movieDetail/${movie.id}`}>
                          <a>
                            <svg
                              width="30"
                              height="30"
                              xmlns="http://www.w3.org/2000/svg"
                              className="ipc-icon m-1 group-hover:text-yellow-400 cursor-pointer ipc-icon--play-circle-outline-large-inline ipc-icon--inline sc-4cf1171c-14 bseoUA editorial-play-icon"
                              id="iconContext-play-circle-outline-large-inline"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              role="presentation"
                            >
                              <path d="M10.803 15.932l4.688-3.513a.498.498 0 0 0 0-.803l-4.688-3.514a.502.502 0 0 0-.803.402v7.026c0 .412.472.653.803.402z"></path>
                              <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zm0-1c6.075 0 11-4.925 11-11S18.075 1 12 1 1 5.925 1 12s4.925 11 11 11z"></path>
                            </svg>
                            <div>{movie ? movie.original_title : ""}</div>
                            <div> {movie ? movie.release_date : ""}</div>

                            <div className="truncate font-normal text-sm leading-5 text-stone-400  ">
                              {movie ? movie.overview : ""}
                            </div>
                          </a>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <Link href="/movie/upcoming">
                  <a className="flex hover:text-yellow-400  font-bold  text-xl">
                    <span className="ml-2">Browse trailers</span>
                    <ChevronRightIcon className="w-5" />
                  </a>
                </Link>
              </div>
            </div>

            <ListCarousel />
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const popData = await fetch(
    `${IMAGE_START}/popular?api_key=${TMDB_KEY}&${IMAGE_END}`
  ).then((res) => res.json());

  const upcomingData = await fetch(
    `${IMAGE_START}/upcoming?api_key=${TMDB_KEY}&${IMAGE_END}`
  ).then((res) => res.json());

  return {
    props: {
      popularMovies: popData.results || [],
      upcomingMovies: upcomingData.results.slice(0, 3) || [],
    }, // will be passed to the page component as props
  };
}
