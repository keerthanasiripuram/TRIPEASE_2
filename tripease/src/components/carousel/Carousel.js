import React from 'react';
import ImageSlider from '../imageslider/ImageSlider';

const Carousel = () => {
  const images = [
    '/assets/default_img.png',
    '/assets/my (6).jpg',
    '/assets/Diary.jpg'
  ];

  return (
    <div className="App">
      <h1>Image Slider</h1>
      <ImageSlider images={images} />
    </div>
  );
};

export default Carousel;

