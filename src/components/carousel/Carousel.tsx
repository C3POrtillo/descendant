/* eslint-disable tailwindcss/no-custom-classname */
import { useDrag } from '@use-gesture/react';
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

  const bind = useDrag(
    state => {
      if (state.last) {
        if (state.direction[0] > 0) {
          prevSlide();
        } else if (state.direction[0] < 0) {
          nextSlide();
        }
      }
    },
    {
      axis: 'x',
    },
  );
  
  return (
    // eslint-disable-next-line tailwindcss/no-arbitrary-value
    <div className="relative mx-auto max-w-[92vw]">
      <div className="flex overflow-hidden py-3" 
        {...bind()}
      >
        {slides.map((slide, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className={['carousel-slide inline-flex w-full shrink-0 px-3', index === currentIndex ? 'translate-x-0' : 'translate-x-full'].join(' ')}
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {slide}
          </div>
        ))}
      </div>
      <div>
        <button onClick={prevSlide} className="carousel-button -left-10">
          <i className="fa fa-chevron-left self-center" />
        </button>
        <button onClick={nextSlide} className="carousel-button -right-10">
          <i className="fa fa-chevron-right self-center" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
