/* eslint-disable tailwindcss/no-custom-classname */
import React, { useState } from 'react';

import type { FC, ReactNode } from 'react';

interface CarouselProps {
  slides: ReactNode[];
}

const Carousel: FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="mx-auto flex max-w-[90vw] flex-col gap-2 rounded-lg border-2 border-solid border-white bg-slate-800 p-4 text-3xl shadow-md shadow-black">
      <div className="flex overflow-x-hidden pb-2">
        {slides.map((slide, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={[
              'carousel-slide inline-flex w-full shrink-0 px-3',
              index === currentIndex ? 'translate-x-0' : 'translate-x-full',
            ].join(' ')}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div className="flex flex-row justify-center gap-4">
        <button onClick={prevSlide} className="carousel-button">
          <i className="fa fa-chevron-left self-center" />
        </button>
        <button onClick={nextSlide} className="carousel-button">
          <i className="fa fa-chevron-right self-center" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
