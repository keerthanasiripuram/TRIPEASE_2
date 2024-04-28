import React, { useEffect, useState } from "react"
import  "./weather.css"
export default function Weather() {
    const [place,setplace]=useState("") 
    const [location, setLocation] = useState("--------");
    const [tempIcon, setTempIcon] = useState("file:///C:/weather/wicons/sun.png");
    const [tempValue, setTempValue] = useState("-------");
    const [climate, setClimate] = useState("-----");
    function searchButton(e)
    {
        e.preventDefault();
        getweather(place);
        setplace("")
    }
    const getweather=async(city)=>
{
    try{
        const response=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=05a0965b85321a2eedfd80bd6f37ab80`,
        {mode:`cors`}
        );
        const weatherData=await response.json();
        console.log(weatherData);
        const{name}=weatherData;
        const{feels_like}=weatherData.main;
        const{id,main}=weatherData.weather[0];
        console.log(id,"28")
        setLocation(name);
        setClimate(main);
        setTempValue(Math.round(feels_like-273));

                    if(id<300&& id>200)
                    {
                        setTempIcon("./assets/thunderstorm.png");
                    }
                    else if(id<400&& id>300)
                    {
                        setTempIcon("./assets/clouds.png");
                    }
                    else if(id<600&& id>500)
                    {
                        setTempIcon("./assets/rain.png");
                    }
                    else if(id<700&& id>600)
                    {
                        setTempIcon("./assets/snow.png");
                    }
                    else if(id>800&& id>700)
                    {
                        setTempIcon("./assets/sun.png");
                    }
    }
    catch(error)
    {
        alert('city not found');
    }
};

    return (
       <>
       <form id="search-form">
        <input type="search" value={place} onChange={(e)=>setplace(e.target.value)} placeholder="Enter the city" id="search-input" required autocomplete="off"/>
        <br/>
        <br/>
        <button id="search-button" onClick={searchButton}>Search</button>
    </form>
    <main id="app-container">
        <div id="location">
              <p>{location}</p>
        </div>
        <div id="temp">
            <img id="temp-icon" src={tempIcon} alt="missing"/>
            <p><span id="temp-value">{tempValue}</span><span id="temp-unit">&#176c</span></p>
        </div>

        <div id="climate">
            <p>{climate}</p>
        </div>
    </main>
       </>       
    )
}