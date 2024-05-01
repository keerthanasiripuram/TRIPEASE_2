import React from 'react'
import styles from "./topbar.module.css"
//import TopBar from '../..components/topbar/Topbar'
import {Search,Person,Chat,Notifications} from '@material-ui/icons'
export default function topbar()
{
    return(
        <div className="topbarContainer">
           <div className="topbarLeft">
                <span className='logo'>TripEase</span>
           </div>
           <div className='topbarRight'>
            <h1>Journal</h1>
            </div>
        </div>
        
    )
}