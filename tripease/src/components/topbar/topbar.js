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
                <input type="text" placeholder='Search for post' className="searchInput" />
            </div>
        </div>
        </div>
    )
}