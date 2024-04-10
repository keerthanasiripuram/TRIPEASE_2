import React, { useEffect,useState } from "react"
import { Link } from "react-router-dom"
import "./Feature.css"
export default function Feature({element})
{
    return(
        <>
        <div className="container">
        <Link to={`/${element.feature}`} style={{ textDecoration: "none" }}>
        <p>{element.feature}</p>
      </Link>
      <span className="material-symbols-outlined">{element.feature_link}</span>
        
        </div>
        </>
    )
}