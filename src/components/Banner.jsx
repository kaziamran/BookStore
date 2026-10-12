import React from 'react'
import { assets } from '../assets/assets'

const Banner = () => {
  return (
    <section
        aria-label="Huge sale banner"
        className="relative isolate flex min-h-420px items-center overflow-hidden bg-[#c6e5de] sm:min-h-520px lg:min-h-700px"
    >
      {/* Background image (slow zoom) */}
      <div
        aria-hidden="true"
        style={{ backgroundImage: `url(${gradientBg})` }}
        className="animate-bg-zoom absolute inset-0 -z-20 bg-cover bg-position:70%_center bg-no-repeat md:bg-right"
      />

      {/* Soft overlay so the text stays readable on small screens */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-r from-[#c6e5de]/80 via-[#c6e5de]/30 to-transparent lg:from-transparent lg:via-transparent"
      />

       {/* Content */}
      <div className="w-full px-6 sm:px-12 lg:px-0 lg:pl-[14%]">
        <div className="w-fit text-center font-['Alike',serif]">
          <h2 className="animate-slide-right text-5xl text-white [animation-delay:100ms] sm:text-6xl lg:text-8xl">
            Huge Sale
          </h2>

          <h1 className="animate-fade-up -mt-1 text-6xl leading-tight text-[#333] [animation-delay:300ms] sm:text-8xl lg:-mt-2 lg:text-[10rem] lg:leading-none">
            Koparion
          </h1>

          <p className="animate-fade-up mt-2 text-lg text-gray-600 [animation-delay:500ms] sm:text-2xl lg:mt-4 lg:text-3xl">
            Now starting at £99.00
          </p>

          <a
            href="#shop"
            className="animate-pop-in mt-6 inline-block rounded-sm bg-[#ee7b24] px-10 py-2.5 text-lg text-white shadow-md shadow-black/30 transition duration-300 [animation-delay:700ms] hover:-translate-y-0.5 hover:bg-[#d96a16] hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ee7b24] active:translate-y-0 sm:mt-8 sm:text-2xl lg:mt-12 lg:px-12 lg:py-3"
          >
            Shop now
          </a>
        </div>
      </div>
    </section>
  )
}

export default Banner