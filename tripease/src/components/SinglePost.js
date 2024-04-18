import React from 'react';
import "./SinglePost.css";
function SinglePost({ element }) {
    return (
        <>
            <div className='profile-container'>
                <div className='left-profile-container'>
                    <img className='profileImg' src="/assets/Diary.jpg" />
                </div>
                <div className='right-profile-container'>
                    <p>Keerthana</p>
                    <p>{element.createdAt}</p>
                </div>
            </div>
            <div>
                <p>{element.description}</p>
                <p>{element.images}</p>
                <img src="" alt="Uploaded" style={{ maxWidth: '100%', maxHeight: '200px' }} />
            </div>
        </>
    )
}
export default React.memo(SinglePost);