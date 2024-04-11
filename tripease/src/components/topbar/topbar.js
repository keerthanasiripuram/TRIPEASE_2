import React from 'react'
import "./topbar.css"
//import TopBar from '../..components/topbar/Topbar'
import {Search,Person,Chat,Notifications} from '@material-ui/icons'
export default function topbar()
{
    return(
        <div className="topbarContainer">
           <div className="topbarLeft">
                <span className='logo'>LamaSocial</span>
           </div>
           <div className="topbarCenter">
            <div className='searchbar'>
                <Search className='searchIcon'/>
                <input type="text" placeholder='Search for friend,post or video' className="searchInput" />
            </div>
           </div>
           <div className="topbarRight">
            <div className="topbarLinks">
                <span className="topbarLink">Homepage</span>
                <span className="topbarLink">Timeline</span>
            </div>
            <div className="topbarIcons">
                <div className="topbarTconItem">
                    <Person/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarTconItem">
                    <Chat/>
                    <span className="topbarIconBadge">1</span>
                </div>
                <div className="topbarTconItem">
                    <Notifications/>
                    <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <img src="/assets/flowers/bqut2.jpg" alt="not-found" className='topbarImg'/>
           </div>
        </div>
    )
}