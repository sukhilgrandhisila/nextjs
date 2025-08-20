import React from "react";
import { BeatLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-black">
      <BeatLoader color="#ff0000" size={15} />
    </div>
  );
};

export default Loading;
