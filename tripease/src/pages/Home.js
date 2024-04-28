import React, { useEffect,useState } from "react"
import Feature from "../components/Feature"
import Carousel from "../components/carousel/Carousel"
import Trial from "../components/Trial"
import "./Home.css"
export default function Home()
{  

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
    
      

    
    return(
        <>
        <navbar>
            <div className="left-container">
                <h1>Trip<span style={{backgroundColor:"red",borderRadius: '5px',padding:'1px',marginLeft:'1px'}}>Ease</span></h1>
            </div>
            <div className="right-container">
            {links.map((element)=>
            (
                <Feature  key={element.id} element={element}/>
            ))
            }
            </div>
        </navbar>
       {/*<Carousel/>*/}
       <h2>Multi-Element Carousel</h2>
       
        <Trial/>
        </>
    )
}
