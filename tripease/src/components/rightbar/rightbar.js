// import "./rightbar.css"
import {Users} from "../../dummydata"
import Online from "../online/Online"
export default function rightbar()
{
    return(
        <div className="rightbar">
            <div className="rightbarWrapper">
                <div className="birthdayContainer">
                    <img className="birthdayImg" src="assets/flowers/bqut2.jpg"></img>
                    <span className="birthdayText">
                        <b>Kikki</b> and <b>3 others </b>have a birthdat today</span>
                </div>
                <img className="rightbarAd" src="assets/flowers/bqut2.jpg" alt=""/>
                <h4 className="rightbarTitle">Online Friends</h4>
                <ul className="rightbarFriendList">
                    {Users.map(u=>(
                        <Online key={u.id} user={u}/>
                    ))}
                </ul>
            </div>
        </div>
    )
}