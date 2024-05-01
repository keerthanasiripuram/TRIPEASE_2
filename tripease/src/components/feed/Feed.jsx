// import "./feed.css"
import Share from "../share/Share"
import Post from "../posts/Posts"
import {Posts} from '../../dummydata'
export default function Feed()
{
    return(
        <div className="feed">
            <div className="feedWrapper">
                <Share/>
                <Post/>
                {/*{Posts.map((p)=>(
                    <Post key={p.id} post={p}/>
                ))}*/}
            </div>
        </div>
    )
}