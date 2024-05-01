// import "./closeFriend.css"
export default function CloseFriend({user})
{
    return(
        <li className="sidebarFriend">
        <img className="sidebarFriendImg" src="/assets/popular/popular-1.png" alt="not-found"></img>
        <span className="sidebarFriendName">{user.username}</span>
    </li>
    )
}