import React, { useEffect,useState } from "react"
import {Link,useNavigate} from "react-router-dom"

export default function Navbar()
{  
  const navigate =useNavigate()
    function logout()
    {
      console.log("loogout")
      localStorage.removeItem("token")
      navigate('/')
    }
    return(
        <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
    <Link style={{color:"black",textDecoration:"None"}} to="/home">Trip Ease</Link>
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 " style={{gap:"1rem"}}>
        <Link style={{color:"black",textDecoration:"None"}} to="/doc">Document Management</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/split">Expense Management</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/weather">Weather</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/trip">Trip</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/translator">Translator</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/explore">Explore</Link>
        <Link style={{color:"black",textDecoration:"None"}} to="/emergency">Emergency</Link>
      </ul>
      <form className="d-flex" role="search">
      <Link to="/profile" style={{color:"black",display:"flex",alignSelf:"center"}}><span className="material-symbols-outlined">
account_circle
</span></Link>
        <button className="btn btn-outline-danger" type="submit" onClick={logout}>Logout</button>
      </form>
    </div>
  </div>
</nav>
        </>
    )
}
