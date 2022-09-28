import React, {
  createContext,
  useReducer,
  useEffect,   
} from "react";
import AppReducer from "./AppReducer";
import { useAuth } from "./AuthUserProvider";

let UserEmail;
// initial state
let initialState = {
  watchlist: [],

  watched: [],
};

// create context
export const GlobalContext = createContext(initialState);

// provider components
export const GlobalProvider = (props) => {
  const { authUser } = useAuth();
  UserEmail = authUser && authUser.email;

  const [state, dispatch] = useReducer(AppReducer, initialState);
  useEffect(() => {
    initialState = {
      watchlist: localStorage.getItem(`${UserEmail}`)
        ? JSON.parse(localStorage.getItem(`${UserEmail}`))
        : [],

      watched: localStorage.getItem("watched")
        ? JSON.parse(localStorage.getItem("watched"))
        : [],
    };

    localStorage.setItem(`${UserEmail}`, JSON.stringify(state.watchlist));
    localStorage.setItem("watched", JSON.stringify(state.watched));
  }, [state]);

  // actions
  const addMovieToWatchlist = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHLIST", payload: movie });
  };

  const removeMovieFromWatchlist = (id) => {
    dispatch({ type: "REMOVE_MOVIE_FROM_WATCHLIST", payload: id });
  };

  const addMovieToWatched = (movie) => {
    dispatch({ type: "ADD_MOVIE_TO_WATCHED", payload: movie });
  };

  const moveToWatchlist = (movie) => {
    dispatch({ type: "MOVE_TO_WATCHLIST", payload: movie });
  };
  const removeFromWatched = (id) => {
    dispatch({ type: "REMOVE_FROM_WATCHED", payload: id });
  };

  return (
    <GlobalContext.Provider
      value={{
        watchlist: state.watchlist,
        watched: state.watched,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        addMovieToWatched,
        moveToWatchlist,
        removeFromWatched,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
