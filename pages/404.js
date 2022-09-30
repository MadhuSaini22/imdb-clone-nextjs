import Image from "next/image";
import React from "react";

function PageNotFound() {
  // component for rendering the 404 page
  return (
    <div className="h-screen  flex flex-col justify-center items-center">
      <div>
        <h1 className="!text-4xl font-bold text-red-600 mb-5">
          {" "}
          Oops!! Error occured, PageNotFound
        </h1>
      </div>
      <div>
        <Image
          className="rounded h-14"
          src="https://www.pngfind.com/pngs/m/27-276071_sillybee-used-roll-picture-sillybee-rolled-funny-memes.png"
          alt="img"
          height="500px"
          width="711px"
        />
      </div>
    </div>
  );
}

export default PageNotFound;
