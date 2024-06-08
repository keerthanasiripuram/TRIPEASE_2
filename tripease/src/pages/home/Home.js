import React, { useEffect,useState } from "react"
import Feature from "../../components/feature/Feature"
import Carousel from "../../components/carousel/Carousel"
import Trial from "../../components/trial/Trial"
import styles from "./Home.module.css"
export default function Home()
{  
    const [noOfSlides,setnoOfSlides]=useState(5)
    const links=[
        {   
            id:1,
            feature:"Flights",
            feature_link:"flight"
        },
        {   
            id:2,
            feature:"Hotels",
            feature_link:"flight"
        },
        {   
            id:3,
            feature:"Homestays",
            feature_link:"flight"
        },
        {   
            id:4,
            feature:"Trains",
            feature_link:"flight"
        },
        {   
            id:5,
            feature:"Buses",
            feature_link:"flight"
        },
        {   
            id:6,
            feature:"Cabs",
            feature_link:"flight"
        },
    ]
    const collections=[
        {
          count:10,
          collection_name:'Temple'
        },
        {
          count:11,
          collection_name:'Park'
        },
        {
          count:12,
          collection_name:'Museum'
        },
        {
          count:13,
          collection_name:'Beach'
        },
        {
          count:1,
          collection_name:'Fort'
        },
        {
          count:2,
          collection_name:'Waterfall'
        },
      ]


      

    
    return(
        <>
        <div className={styles.navbar}>
            
            <div className={styles.leftContainer}>
                <h1>Trip<span style={{backgroundColor:"red",borderRadius: '5px',padding:'1px',marginLeft:'1px'}}>Ease</span></h1>
            </div>
            <div className={styles.rightContainer}>
            {links.map((element)=>
            (
                <Feature  key={element.id} element={element}/>
            ))
            }
            </div>
        </div>
       {/*<Carousel/>*/}
       <h2>Multi-Element Carousel</h2>
       
        <Trial data={collections} slides={noOfSlides}/>
        </>
    )
}
