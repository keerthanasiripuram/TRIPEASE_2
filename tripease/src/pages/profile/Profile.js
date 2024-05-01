
import "./Profile.css"
import TopBar from '../../components/topbar/topbar'
import SideBar from '../../components/sidebar/Sidebar'
import RightBar from '../../components/rightbar/rightbar'
import Feed from '../../components/feed/Feed'
export default function Profile({user})
{
    return(
        <div>
           <TopBar/>
           <div className='profile'>
           
           <div className="profileRight">
            <div className="profileRightTop">
                <div className="profileCover">
                    <img src="assets/default_img.png" alt="" className="profileCoverImg" />
                    <img src="assets/default_img.png" alt="" className="profileUserImg" />
                    <div className="profileInfo">
                    <h4 className="profileInfoName">Keerthana</h4>
                    <span className="profileInfoDesc">Kikki</span>
                </div>
                </div>
                
            </div>
            <div className="profileRightBottom">
            <Feed/>
            </div>
           </div>
           
           </div>
        </div>
    )
}

