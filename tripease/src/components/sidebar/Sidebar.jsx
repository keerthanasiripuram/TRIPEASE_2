import CloseFriend from "../closeFriend/CloseFriend"
import {Users} from "../../dummydata"
import "./sidebar.css"
import {RssFeed} from "@material-ui/icons"
export default function Sidebar()
{   
    return(
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <RssFeed className="sidebarIcon"/>
                        <span className="sidebarItemText">Feed</span>
                    </li>
                </ul>
                <button className="sidebarButton">Show More</button>
                <hr className="sidebarHr"/>
                <ul className="sidebarFriendList">
                    {Users.map(u=>
                        (
                            <CloseFriend key={u.id} user={u}/>
                        ))}
                </ul>
            </div>
        </div>
    )
}