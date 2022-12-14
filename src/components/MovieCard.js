import React from "react";
import { MovieControls } from "./MovieControls";
import Moment from "react-moment";
import { SEARCH_IMG } from "../../Config";
import Image from "next/image";
export const MovieCard = ({ movie, type }) => {
  return (
    <div>
     {/* watchlist component card */}
      <div className="relative  grid grid-cols-5 gap-2 text-dark-forgot border-b m-4 border-gray-500">
        <div className=" col-span-1 p-1">
          {movie.poster_path ? (
            <Image
              className=""
              src={`${SEARCH_IMG}/w200${movie.poster_path}`}
              alt={`${movie.title} Poster`}
              width="101px"
              height="152px"
            />
          ) : (
            <div className="" />
          )}
        </div>

        <div className="col-span-4 font-coverFont">
          <div className="">
            <h3 className="text-dark-forgot mt-1 ">{movie.title}</h3>
            <h4 className="text-xs text-gray-400">
              <Moment format="YYYY">{movie.release_date}</Moment>
            </h4>
            <div className="text-xs text-gray-700"> ⭐{movie.vote_average}</div>

            <p className="text-sm text-gray-400 ">{movie.original_title}</p>

            <div className="text-xs line-clamp-3 text-gray-700 font-coverFont leading-4">
              {movie.overview}{" "}
            </div>
          </div>
        </div>
        <MovieControls type={type} movie={movie} />
      </div>
    </div>
  );
};
