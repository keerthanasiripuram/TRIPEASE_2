import "./share.css"
import {PermMedia,Label,Room,EmojiEmotions} from "@material-ui/icons"
export default function Share()
{
    return(
        <div className="share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src="/assets/flowers/bqut2.jpg"></img>
                    <input placeholder="what's in your mind" className="shareInput"></input>
                </div>
                <hr className="shareHr"/>
                <div className="shareBottom">
                    <div className="shareOptions">
                        <div className="shareOption">
                            <PermMedia htmlColor="blue"/>
                            <span className="shareOptionText">Photo </span>
                        </div>
                    </div>
                    <button className="shareButton">Share</button>
                </div>
            </div>
        </div>
    )
}