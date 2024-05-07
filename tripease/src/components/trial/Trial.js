import React ,{useState} from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from "./Trial.module.css";
export default function Trial({data,slides})
{   
  
  const [displayContent,setdisplayContent]=useState(true)
  // if(slides==1)
  //   {
  //     setdisplayContent(false)
  //   }
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow:slides,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: slides,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: slides,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  }
  console.log(data)
  return (
    <div style={{margin:"25px"}}>
      <Slider {...settings}>
      {data.map((element)=>
        (
          <div className={styles.imageContainer} key={element.collection_name}>
            <img
                    src={`http://localhost:3000/TripEase/backend/uploadJournal/${element.collection_name}`} 
                     alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
          {!element.collection_name.includes(".jpg")&&!element.collection_name.includes(".png")&&<div className={styles.textOverlay}>
             <h1 className='count'>Top {element.count}</h1>
             <p>{element.collection_name}</p>
          </div>}
    </div>
        ))}
      
        
       
  
  </Slider>
      </div>
    
  );


}