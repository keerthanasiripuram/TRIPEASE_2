import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import  "./Trial.css";
export default function Trial({element})
{   
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };
  const collections=[
    {
      count:10,
      collection_name:'Beach Destinations'
    },
    {
      count:11,
      collection_name:'Weekend Gateways'
    },
    {
      count:12,
      collection_name:'Hill Stations'
    },
    {
      count:13,
      collection_name:'Adventure Destinations'
    },
    {
      count:1,
      collection_name:'Heritage Destinations'
    },
    {
      count:2,
      collection_name:'Pilgrimage Destinations'
    },
  ]
  return (
    <div style={{margin:"25px"}}>
      <Slider {...settings}>
      {collections.map((element)=>
        (
          <div className="image-container">
          <img src="assets/Diary.jpg" alt="Description of the image"/>
          <div className="text-overlay">
             <h1 className='count'>Top {element.count}</h1>
             <p>{element.collection_name}</p>
          </div>
    </div>
        ))}
      
        
       
        
        {/*<div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
        </div>
        
        <div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
        </div>
        <div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
        </div>
        <div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
        </div>
        <div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
        </div>
        <div className="image-container">
        <img src="assets/Diary.jpg" alt="Description of the image"/>
        <div className="text-overlay">
           <h1 className='count'>Top 10</h1>
           <p>Beach Destinations</p>
        </div>
  </div>*/}
  </Slider>
      </div>
    
  );


}