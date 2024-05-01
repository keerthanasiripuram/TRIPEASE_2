import React from 'react';
 import styles from "./SinglePost.module.css";

function SinglePost({ element }) {
    const imageUrl = `http://localhost:3000/TripEase/backend/uploadJournal/${element.images[0]}`;
    const date = element.createdAt;
    const dateOnlyString = date.split("T")[0];
    return (
        <div className='conatiner'>
            <div className='profileContainer'>
                <div className='leftProfileContainer'>
                    <img className='profileImg' src="/assets/Diary.jpg" />
                </div>
                <div className='rightProfileContainer'>
                    <p>Keerthana</p>
                    <p>{dateOnlyString}</p>
                </div>
            </div>
            <div className='profileBody'>
                <p>{element.description}</p>
                {element.images.map((imgsrc,index)=>
                (
                    <img 
                    key={index} // Using index as key assuming the filenames are unique
                    src={`http://localhost:3000/TripEase/backend/uploadJournal/${imgsrc}`} 
                     alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
                ))}
            </div>
        </div>
    )
}
export default React.memo(SinglePost);