import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <section
      aria-label="Huge sale banner"
      className="relative isolate flex min-h-440px items-center overflow-hidden bg-[#c6e5de] sm:min-h-520px lg:min-h-720px"
    >
      {/* Content */}
      <div 
        aria-hidden="true"
        style={{ backgroundImage: `url(${assets.bannerImg02})` }}
        className="w-full py-16 inset-0 -z-10 bg-cover bg-center bg-no-repeat">
        {/* Blurred color */}
        <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[#cd8d8d40] backdrop-blur-sm"
        />

        <div className="w-fit text-center pt-10">
          <h2 className="animate-slide-right text-4xl text-white [animation-delay:100ms] sm:text-3xl lg:text-3xl">
            Huge Sale
          </h2>

          <h1 className="animate-fade-up -mt-1 text-6xl leading-tight text-[#333] [animation-delay:300ms] sm:text-7xl lg:-mt-2 lg:text-[7rem] lg:leading-none">
            Big Savings on Your Favorite Books
          </h1>

          <p className="animate-fade-up mt-2 text-lg text-gray-600 [animation-delay:500ms] sm:text-2xl lg:mt-4 lg:text-3xl">
            Now starting at £89.00
          </p>

          <a
            href="#shop"
            className="animate-pop-in mt-6 inline-block rounded-sm bg-[#ee7b24] px-10 py-2.5 text-lg text-white shadow-md shadow-black/30 transition duration-300 [animation-delay:700ms] hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 sm:mt-8 sm:text-2xl lg:mt-12 lg:px-12 lg:py-3"
          >
            Shop now
          </a>
        </div>
      </div>

      {/* Background image (slow zoom) */}
      {/* <div
        aria-hidden="true"
        style={{ backgroundImage: `url(${assets.gradientBg})` }}
        className="animate-bg-zoom absolute inset-0 -z-20 bg-cover bg-position:70%_center bg-no-repeat md:bg-right"
      /> */}
    </section>
  )
}

export default Banner