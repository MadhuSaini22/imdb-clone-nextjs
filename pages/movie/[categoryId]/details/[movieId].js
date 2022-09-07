import React from "react";
import { useRouter } from "next/router";

function MovieDetails() {
  const router = useRouter();
  const {movieId,categoryId} = router.query;
  return <div className="text-3xl font-bold ">MovieDetails {movieId} from {categoryId}</div>;
}

export default MovieDetails;
