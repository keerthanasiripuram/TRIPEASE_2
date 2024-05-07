import React, { useState } from 'react';
import {useEffect} from "react"
 import styles from "./SinglePost.module.css";
import Trial from '../trial/Trial';

function SinglePost({ element }) {
    const imageUrl = `http://localhost:3000/TripEase/backend/uploadJournal/${element.images[0]}`;
    const date = element.createdAt;
    const dateOnlyString = date.split("T")[0];
    console.log(element.images)
    const[noOfSlides,setnoOfSlides]=useState(1)
    const [carouselInput, setCarouselInput] = useState([]);

    useEffect(() => {
        const updatedCarouselInput = element.images.map(img => ({
            count: 1,
            collection_name: img
        }));
    
        setCarouselInput(updatedCarouselInput);
    }, [element.images]);
    
    console.log(19, carouselInput);
    


    return (
        <div className={styles.conatiner}>
            <div className={styles.profileContainer}>
                <div className={styles.leftProfileContainer}>
                    <img className={styles.profileImg} src="/assets/Diary.jpg" />
                </div>
                <div className={styles.rightProfileContainer}>
                    <p>Keerthana</p>
                    <p>{dateOnlyString}</p>
                </div>
            </div>
            <div className={styles.profileBody}>
                <p>{element.description}</p>
                 <Trial data={carouselInput} slides={noOfSlides}/> 
                {/* {element.images.map((imgsrc,index)=>
                (
                    <img 
                    key={index} // Using index as key assuming the filenames are unique
                    src={`http://localhost:3000/TripEase/backend/uploadJournal/${imgsrc}`} 
                     alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                    
                ))} */}
            </div>
        </div>
    )
}
export default React.memo(SinglePost);