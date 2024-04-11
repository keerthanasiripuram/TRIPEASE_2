import "./posts.css"
import {MoreVert} from "@material-ui/icons"
import {Users} from "../../dummydata"
import {useState} from "react"
export default function Posts({post})
{   console.log(post)
    const [like,setLike]=useState(post.like)
    const [isLiked,setisLiked]=useState(false)
    const likeHandler=()=>
    {
        setLike(isLiked?like-1:like+1)
        setisLiked(!isLiked)
    }
    return(
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <img className="postProfileImg" src="/assets/flowers/bqut2.jpg"></img>
                        <span className="postUsername">
                            {Users.filter(u=>u.id===post.userId)[0].username}
                        </span>
                        <span className="postDate">{post.date}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert/>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src="assets/flowers/bqut2.jpg"/>
                </div>
                <div className="postBottom">
                <div className="postBottomLeft">
                <img className="likeIcon" src="assets/flowers/bqut2.jpg" onClick={likeHandler}/>
                <img className="likeIcon" src="assets/flowers/bqut2.jpg" onClick={likeHandler}/>
                <span className="postLikeCounter">{like}people liked it</span> 
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment}comments</span>
                </div>
                </div>
            </div>
        </div>
    )
}