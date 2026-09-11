import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'

const Home = () => {
  return (
    <div className="flex flex-col gap-2 md:gap-12 overflow-x-hidden">
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  )
}

export default Home