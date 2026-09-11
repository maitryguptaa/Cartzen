import React from "react";
import bannerr from "../assets/bannerr.png";

const MidBanner = () => {
  return (
    <div
      className="bg-gray-800 bg-cover bg-center h-64 md:h-80 rounded-2xl flex items-center justify-center text-center shadow-lg overflow-hidden"
      style={{
        backgroundImage: bannerr ? `url(${bannerr})` : undefined,
      }}
    >
      <div className="bg-black/5 w-full h-full flex flex-col items-center justify-center rounded-2xl px-6 md:px-16">
        <h1 className="text-white text-2xl md:text-4xl font-bold mb-3 leading-tight">
          Everything You Need, All in One Place
        </h1>

        <p className="text-gray-200 text-sm md:text-base mb-6 max-w-xl">
          From fashion to electronics to jewelry — shop unbeatable prices with free shipping on every order.
        </p>

        
      </div>
    </div>
  );
};

export default MidBanner;