// import "./online.css"
export default function Online({user})
{
    return(
        <li className="rightBarFriend">
                        <div className="rightbarProfileImgContainer">
                        <img className="rightbarProfileImg" src="assets/flowers/bqut2.jpg"></img>
                        <span className="rightbarOnline"></span>
                        </div>
                        <span className="rightbarUsername">{user.username}</span>
        </li>
    )
}