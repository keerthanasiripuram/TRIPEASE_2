import React from 'react';
import "./SinglePost";
function SinglePost({element})
{   
    return(
        <>
            <div className='profileContainer' style={{border:"2px solid orange"}}>
            <div className='left-profileContainer'>
            <img className='profileImg' src="/assets/Diary.jpg"/>
            </div>
            <div className='right-profileContainer'>
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