import React, {useEffect,useState} from "react" 

export default function useFetch(url){
   
    const [ movies, setMovies] = useState([]);
  
    useEffect(() => {
      fetch(`${url}`)
        .then((res) => res.json())
        .then((data) => setMovies(data.results));
    }, [url]);
    return {movies}
}