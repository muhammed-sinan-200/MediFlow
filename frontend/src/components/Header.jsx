import React, { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { assets, heroSlides } from '../assets/assets.js'

const AUTO_SLIDE_DELAY = 6000

const Header = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    duration: 25,
  })

  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = useCallback(() => {
    emblaApi && emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    emblaApi && emblaApi.scrollNext()
  }, [emblaApi])

  const scrollTo = useCallback(
    (index) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  )

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    return () => emblaApi.off('select', onSelect)
  }, [emblaApi, onSelect])

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => emblaApi.scrollNext(), AUTO_SLIDE_DELAY)
    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div>
      <section className="relative overflow-hidden rounded-2xl bg-[#f4efff]">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {heroSlides.map((slide) => (
              <div key={slide.id} className="flex-[0_0_100%]">
                <div className="relative h-[calc(100vh-170px)] min-h-[360px] max-h-[560px]">
                  <img
                    src={slide.image}
                    alt={slide.title}
                   className="absolute inset-0 h-full w-full object-cover"
                  />

                  <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                  <div className="relative z-20 flex h-full flex-col justify-center px-6 sm:px-10 lg:px-14">
                    <div className="max-w-[700px]">
                      <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-white backdrop-blur">
                        {slide.eyebrow}
                      </span>

                      <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-semibold text-white leading-tight">
                        {slide.title}
                      </h1>

                      <p className="mt-3 text-sm sm:text-base text-white/85">
                        {slide.description}
                      </p>

                      <div className="mt-5 flex gap-3 flex-wrap">
                        {slide.primaryCta && (
                          <a
                            href={slide.primaryCta.href}
                            className="bg-white text-purple-700 px-5 py-2.5 rounded-full font-medium flex items-center gap-2 hover:scale-105 transition"
                          >
                            {slide.primaryCta.label}
                            <img src={assets.arrow_icon} className="w-4" />
                          </a>
                        )}

                        {slide.secondaryCta && (
                          <a
                            href={slide.secondaryCta.href}
                            className="border border-white/30 text-white px-5 py-2.5 rounded-full backdrop-blur hover:bg-white/10"
                          >
                            {slide.secondaryCta.label}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTROLS BELOW HEADER */}
      <div className="mt-4 flex items-center justify-between px-1 sm:px-2">
        <div className="flex gap-2">
          {heroSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-2.5 rounded-full transition-all ${
                selectedIndex === i
                  ? 'w-8 bg-purple-700'
                  : 'w-2.5 bg-purple-200 hover:bg-purple-300'
              }`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={scrollPrev}
            aria-label="Previous slide"
            className="w-10 h-10 flex items-center justify-center rounded-full border border-purple-200 bg-white text-purple-700 shadow-sm hover:bg-purple-50 transition"
          >
            <ChevronLeft size={18} />
          </button>

          <button
            onClick={scrollNext}
            aria-label="Next slide"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-700 text-white shadow-sm hover:bg-purple-800 transition"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Header