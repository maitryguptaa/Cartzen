import React, { useEffect } from 'react'
import { getData } from '../context/DataContext'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import Category from './Category'

const Carousel = () => {

  const { data, fetchAllProducts } = getData()

  useEffect(() => {
    fetchAllProducts()
  }, [])

  return (
    <div>
      <div className="relative">

        {/* Custom Prev Button */}
        <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-20 
        bg-white/20 backdrop-blur-md border border-white/30 
        text-white w-12 h-12 flex items-center justify-center 
        rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] 
        hover:bg-white/30 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] 
        transition-all duration-300">
          ❮
        </button>

        {/* Custom Next Button */}
        <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-20 
        bg-white/20 backdrop-blur-md border border-white/30 
        text-white w-12 h-12 flex items-center justify-center 
        rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] 
        hover:bg-white/30 hover:scale-110 hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] 
        transition-all duration-300">
          ❯
        </button>

        {/* Custom pagination dot styling — Swiper renders its own classes,
            so Tailwind utility classes on JSX can't target them directly */}
        <style>{`
          .swiper-pagination-bullet {
            background: rgba(255, 255, 255, 0.5);
            opacity: 1;
            width: 9px;
            height: 9px;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background: #ec4899;
            width: 24px;
            border-radius: 9999px;
          }
        `}</style>

        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          slidesPerView={1}
          loop={data?.length > 3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2000 }}
          navigation={{
            nextEl: ".custom-next",
            prevEl: ".custom-prev",
          }}
        >

          {data?.slice(0, 7)?.map((item, index) => (
            <SwiperSlide key={item.id ?? index}>

              <div className="bg-linear-to-r from-[#0f0c29] via-[#302b63] to-[#ff3cac] py-10">

                <div className="flex flex-col md:flex-row gap-10 justify-center min-h-125 my-20 md:my-0 items-center px-12">

                  <div className="md:space-y-6 space-y-3 w-full md:w-125">

                    {/* BUG FIX: was hardcoded "...Best in Electronics" for every slide.
                        Now reflects the actual item's category. */}
                    <h3 className="text-pink-400 font-semibold font-sans text-sm tracking-wide">
                      {item.category
                        ? `Powering Your World with the Best in ${item.category}`
                        : "Powering Your World with the Best Picks"}
                    </h3>

                    <h1 className="md:text-4xl text-xl font-bold uppercase line-clamp-2 md:line-clamp-3 text-white font-[poppins]">
                      {item.title}
                    </h1>

                    <p className="line-clamp-3 text-gray-400 pr-7">
                      {item.description}
                    </p>

                    <button className="bg-linear-to-r from-pink-500 to-purple-500 text-white px-5 py-2 rounded-full shadow-lg hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300 cursor-pointer">
                      Shop Now
                    </button>

                  </div>

                  <div>
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-100 h-100 object-contain rounded-full bg-white p-6 shadow-[0_0_30px_rgba(255,0,150,0.3),0_20px_50px_rgba(0,0,0,0.4)] hover:scale-105 transition-all duration-300"
                    />
                  </div>

                </div>

              </div>

            </SwiperSlide>
          ))}

        </Swiper>
        <Category />

      </div>
    </div>
  )
}

export default Carousel