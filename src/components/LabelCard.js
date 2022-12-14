import Image from "next/image";
import React from "react";
function Label({ icon, authName }) {
  return (
    <div>
      {/* Main label component */}
      <button className="border rounded m-3 p-1 flex justufy-center w-64 h-8 font-coverFont text-sm font-bold text-slate-600 border-slate-300">
        <div className="mr-3 ">
          <Image
            className="h-5 w-9 pl-4  mr-3"
            src={icon}
            alt="img"
            height="20px"
            width="29px"
          />
        </div>
        <div className="">{authName}</div>
      </button>
    </div>
  );
}

export default Label;
