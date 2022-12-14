import React, { useState, useEffect, useRef, useContext } from "react";
import { MenuIcon } from "@heroicons/react/outline";
import { ResultCard } from "./ResultCard";
import { IMAGE_END, TMDB_KEY, IMAGE_START } from "../../Config";
import { GlobalContext } from "../contexts/GlobalState";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "../contexts/AuthUserProvider";
import Image from "next/image";

const Header = () => {
  const timeout = useRef();
  const { authUser, loading, signOut } = useAuth();

  const { watchlist } = useContext(GlobalContext);
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [menu, setMenu] = useState(false);

  const onChange = (e) => {
    e.preventDefault();

    setQuery(e.target.value);
    //Clear the previous timeout.
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&${IMAGE_END}&page=1&include_adult=false&query=${e.target.value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (!data.errors) {
            setResults(data.results.slice(0, 8));
          } else {
            setResults([]);
          }
        });
    }, 400);
  };

  const [error, setError] = useState("");

  return (
    <div className="flex px-2 justify-center items-center py-1 space-x-2">
      <div className="flex space-x-2 items-center">
        {/* Header Image */}
        <Link href="/">
          <a className="flex justify-center items-center">
            <Image
              className="  h-8"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
              alt="img"
              height="31px"
              width="63px"
            />
          </a>
        </Link>
        {/* Menu */}
        <Link href="">
          <a>
            <div className="group hover:bg-slate-800   py-2 px-2  lg:px-3 rounded align-middle justify-center flex">
              <MenuIcon className=" group-hover:opacity-100  opacity-50 w-6 h-5 mr-1 " />
              <span
                className="text-sm font-semibold "
                onClick={() => {
                  setMenu(true);
                }}
              >
                Menu
              </span>
            </div>
          </a>
        </Link>
      </div>
      {menu == true ? (
        // Menu body
        <div className="bg-dark-lightBlack justify-center flex h-full w-full myclass fixed z-20 inset-0 pt-20">
          <div className="lg:w-2/4 mt-5 lg:px-0 px-4">
            <div className="flex mt-2 justify-between">
              <div className="   justify-center ">
                <Link href="/">
                  <a>
                    <Image
                      className=" h-12"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/IMDB_Logo_2016.svg/2560px-IMDB_Logo_2016.svg.png"
                      alt="img"
                      width="95px"
                      height="48px"
                    />
                  </a>
                </Link>
              </div>
              <Link href="">
                <a>
                  <div
                    className="bg-yellow-400 hover:opacity-90 rounded-full h-max p-3 "
                    onClick={() => {
                      setMenu(false);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      className="ipc-icon ipc-icon--clear  "
                      id="iconContext-clear"
                      viewBox="0 0 24 24"
                      fill="black"
                      role="presentation"
                    >
                      <path fill="none" d="M0 0h24v24H0V0z"></path>
                      <path d="M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7A.996.996 0 1 0 5.7 7.11L10.59 12 5.7 16.89a.996.996 0 1 0 1.41 1.41L12 13.41l4.89 4.89a.996.996 0 1 0 1.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"></path>
                    </svg>
                  </div>
                </a>
              </Link>
            </div>
            <div className="flex lg:flex-row md:flex-row sm:flex-row flex-col justify-between mt-11  ">
              <div className="flex flex-col ">
                <div className="flex">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--movie mx-3"
                    id="iconContext-movie"
                    viewBox="0 0 24 24"
                    fill="#FACC15"
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path>
                  </svg>
                  <p className="font-bold text-2xl">Movies</p>
                </div>
                <div className="flex flex-col mt-1 mb-5">
                  <div className="ml-12 mt-3">
                    <Link href="/movie/popular">
                      <a className="hover:underline">
                        <span className="text-white  ">
                          Most Popular Movies
                        </span>
                      </a>
                    </Link>
                  </div>
                  <div className="ml-12 mt-3">
                    <Link href="/movie/top_rated">
                      <a className="hover:underline">
                        <span className="text-white  ">Top Rated Movies</span>
                      </a>
                    </Link>
                  </div>
                  <div className="ml-12 mt-3">
                    <Link href="/movie/upcoming">
                      <a className="hover:underline">
                        <span className="text-white  ">
                          Upcoming Interesting
                        </span>
                      </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--video-library mx-3"
                    id="iconContext-video-library"
                    viewBox="0 0 24 24"
                    fill="#FACC15"
                    role="presentation"
                  >
                    <path d="M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1zm17-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8 12.5v-9l5.47 4.1c.27.2.27.6 0 .8L12 14.5z"></path>
                  </svg>
                  <p className="font-bold text-2xl">Watch</p>
                </div>
                <div className="flex flex-col mt-1 mb-5">
                  <div className="hover:underline ml-12 mt-3">
                    <a href="https://www.imdb.com/">Explore IMDb</a>
                  </div>

                  <div className="hover:underline ml-12 mt-3">
                    <a href="https://www.imdb.com/podcasts/?ref_=nv_pod">
                      Explore IMDb Podcasts
                    </a>
                  </div>
                  <div className="hover:underline  ml-12 mt-3">
                    <Link href="/signInCover">
                      <a>Sign In </a>
                    </Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="ipc-icon ipc-icon--television mx-3"
                    id="iconContext-television"
                    viewBox="0 0 24 24"
                    fill="#FACC15 "
                    role="presentation"
                  >
                    <path fill="none" d="M0 0h24v24H0V0z"></path>
                    <path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path>
                  </svg>
                  <p className="font-bold text-2xl">Watch</p>
                </div>
                <div className="flex flex-col mt-1 mb-5">
                  <div className="hover:underline ml-12 mt-3">
                    <a href="https://www.imdb.com/">Explore IMDb</a>
                  </div>

                  <div className="hover:underline ml-12 mt-3">
                    <a href="https://www.imdb.com/podcasts/?ref_=nv_pod">
                      Explore IMDb Podcasts
                    </a>
                  </div>
                  <div className="hover:underline  ml-12 mt-3">
                    <Link href="/signInCover">
                      <a>Sign In </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <span></span>
      )}
      {error && alert(JSON.stringify(error))}
      {/* Search box */}
      <div className="flex-1  relative">
        <div className="">
          <input
            type="text"
            className="text-sm focus:border-yellow-400 focus:border-2 px-2 placeholder:text-slate-500 text-black flex-1 w-full rounded h-8 outline-none border bg-right  hidden sm:block lg:block md:block"
            placeholder="Search IMDB"
            value={query}
            onChange={onChange}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white sm:text-slate-500 absolute right-3 top-1/2 -translate-y-1/2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Search Results */}
        <div className="z-10 m-auto absolute ">
          <div className="bg-dark-lightBlack">
            {results
              ? results.length > 0 && (
                  <div className="">
                    {results.map((movie) => (
                      <div key={movie.id}>
                        <ResultCard movie={movie} />
                      </div>
                    ))}
                  </div>
                )
              : ""}
          </div>
        </div>
      </div>
      {/* WatchList component */}
      <div className="">
        <Link href="/watchlist">
          <a>
            <div className=" hover:bg-slate-800 py-2 px-2  lg:px-3 rounded align-middle justify-center flex">
              <svg
                width="24"
                height="24"
                xmlns="http://www.w3.org/2000/svg"
                className="ipc-icon ipc-icon--watchlist ipc-button__icon ipc-button__icon--pre"
                id="iconContext-watchlist"
                viewBox="0 0 24 24"
                fill="currentColor"
                role="presentation"
                style={{ opacity: "0.6" }}
              >
                <path
                  d="M17 3c1.05 0 1.918.82 1.994 1.851L19 5v16l-7-3-7 3V5c0-1.05.82-1.918 1.851-1.994L7 3h10zm-4 4h-2v3H8v2h3v3h2v-3h3v-2h-3V7z"
                  fill="currentColor"
                ></path>
              </svg>
              <div>
                <span className="text-sm font-semibold ">
                  Watchlist
                  {authUser ? (
                    <span className="m-1 bg-yellow-500 px-2 text-black rounded-xl">
                      {watchlist.length}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              </div>
            </div>
          </a>
        </Link>
      </div>
      {/* Sign In / Log out button */}
      <Link href={`${authUser ? "/signIn" : "/signInCover"}`}>
        <a>
          <div className=" hover:bg-slate-800 py-2 px-2  rounded align-middle justify-center flex ">
            {authUser ? (
              <span className="text-sm font-semibold " onClick={signOut}>
                Log Out
              </span>
            ) : (
              <span className="text-sm font-semibold ">Sign In </span>
            )}
          </div>
        </a>
      </Link>
    </div>
  );
};

export default Header;
