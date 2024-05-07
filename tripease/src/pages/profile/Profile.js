
import styles from "./Profile.module.css"
import Feed from '../../components/feed/Feed'
import Navbar from "../../components/navbar/Navbar"
export default function Profile({user})
{
    console.log(user)
    return(
        <div>
           <Navbar/>
           <div className={styles.profile}>
           
           <div className={styles.profileRight}>
            <div className={styles.profileRightTop}>
                <div className={styles.profileCover}>
                    <img src="assets/default_img.png" alt="" className={styles.profileCoverImg} />
                    <img src="assets/default_img.png" alt="" className={styles.profileUserImg}/>
                    <div className={styles.profileInfo}>
                    <h4 className={styles.profileInfoName}>Keerthana's Journal</h4>                
                </div>
                </div>
                
            </div>
            <div className={styles.profileRightBottom}>
            <Feed/>
            </div>
           </div>
           
           </div>
        </div>
    )
}

