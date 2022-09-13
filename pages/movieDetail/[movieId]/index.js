import React from "react";
import { useRouter } from "next/router";
import {
  IMAGE_END,
  IMAGE_PATH,
  TMDB_KEY,
  SEARCH_IMG,
  IMAGE_START,
} from "../../../Config";
import Image from "next/image";

function MovieDetail(props) {
  const router = useRouter();
  const movieId = router.query.movieId;
  // console.log(movieId);

  const { currentMovieDetail } = props;

  // console.log(currentMovieDetail, "currentMovie");

  return (
    <div className="max-w-container m-auto ">
      <div className="w-full relative flex flex-col justify-center group  items-center">
        <div className=" justify-center group-hover:opacity-75 items-center w-11/12">
          <Image
            className=" object-cover  justify-center items-center   "
            src={` ${SEARCH_IMG}/original/${
              currentMovieDetail ? currentMovieDetail.backdrop_path : ""
            }`}
            height="700px"
            width="1200"
            alt="img"
          />
        </div>
        <div className=" w-11/12 lg:w-9/12 flex justify-center items-center top-24 lg:absolute md:absolute sm:absolute">
          <div className="lg:block md:block sm:block hidden mr-8  ">
            <div>
              <Image
                className="w-80 rounded-lg  "
                src={`${SEARCH_IMG}/original/${
                  currentMovieDetail ? currentMovieDetail.poster_path : ""
                }`}
                width="320px"
                height="420px"
                alt="img"
              />
            </div>
          </div>
          <div className=" text-white flex flex-col justify-between  ">
            <div className="lg:text-md text-sm ">
              <div className="font-semibold lg:text-4xl md:text-3xl sm:text-3xl text-2xl">
                {currentMovieDetail ? currentMovieDetail.original_title : ""}
              </div>
              <div className="">
                {currentMovieDetail ? currentMovieDetail.tagline : ""}
              </div>
              <div className="">
                {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                <i className="fas fa-star" />
                <span className=" ml-5">
                  {currentMovieDetail
                    ? "(" + currentMovieDetail.vote_count + ") votes"
                    : ""}
                </span>
              </div>
              <div className="">
                {currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}
              </div>
              <div className="">
                {currentMovieDetail
                  ? "Release date: " + currentMovieDetail.release_date
                  : ""}
              </div>
              <div className="grid grid-cols-2 mt-3  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
                {currentMovieDetail && currentMovieDetail.genres
                  ? currentMovieDetail.genres.map((genre) => (
                      <div key={genre.id}  className="text-center border-2 border-white p-3 rounded-full">
                         
                          {genre.name}
                         
                      </div>
                    ))
                  : ""}
              </div>
            </div>
            <div className="mt-7 text-sm  flex-1">
              <div className=" lg:text-2xl md:text-2xl sm:text-2xl text-xl font-semibold flex relative items-center">
                Synopsis
              </div>
              <div className="line-clamp-2">
                {currentMovieDetail ? currentMovieDetail.overview : ""}
              </div>
            </div>
          </div>
        </div>
        <div className=" flex justify-center items-center  flex-col  mt-5">
          <div className="lg:text-3xl text-2xl mt-2">Useful Links</div>
          <div className="flex  flex-row pt-2 ">
            <div className="justify-center items-center  mt-2 flex">
              {currentMovieDetail && currentMovieDetail.homepage && (
                <a
                  href={currentMovieDetail.homepage}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-4 "
                >
                  <p>
                    <span className="  bg-red-600 flex justify-center items-middle py-3 px-4 rounded-2xl cursor-pointer w-40 text-black font-bold ">
                      Homepage <i className="ml-3 "></i>
                    </span>
                  </p>
                </a>
              )}
            </div>
            <div className="justify-center  mt-2 items-center flex">
              {currentMovieDetail && currentMovieDetail.imdb_id && (
                <a
                  href={
                    "https://www.imdb.com/title/" + currentMovieDetail.imdb_id
                  }
                  target="_blank"
                  style={{ textDecoration: "none" }}
                  rel="noreferrer"
                  className="ml-4"
                >
                  <p>
                    <span className="bg-yellow-400 flex justify-center items-middle py-3 px-4 rounded-2xl cursor-pointer w-40 text-black font-bold">
                      IMDb<i className="newTab fas fa-external-link-alt"></i>
                    </span>
                  </p>
                </a>
              )}
            </div>{" "}
          </div>
        </div>
        <div className=" lg:text-3xl text-2xl mt-5">Production companies</div>
        <div className="grid grid-cols-2 pt-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mb-5">
          {currentMovieDetail &&
            currentMovieDetail.production_companies &&
            currentMovieDetail.production_companies.map((company) => (
              <div className="" key={company.logo_path}>
                {company.logo_path && (
                  <div className="text-center bg-gray-300 p-4 rounded space-y-4">
                    <div className="h-12">
                      <Image
                        className="!w-auto !min-w-[auto] !max-h-12"
                        src={`${SEARCH_IMG}/original` + company.logo_path}
                        alt="img"
                        height="50"
                        width="200"
                        layout="responsive"
                      />
                    </div>
                    <div className="text-black font-medium">{company.name}</div>
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;

export async function getServerSideProps(context) {
  const movieId = context.params.movieId;
  const data = await fetch(
    `${IMAGE_START}/${movieId}?api_key=${TMDB_KEY}&${IMAGE_END}`
  ).then((res) => res.json());

  return {
    props: {
      currentMovieDetail: data || [],
    }, // will be passed to the page component as props
  };
}
