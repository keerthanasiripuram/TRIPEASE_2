import React, { useEffect,useState } from "react"
import {Link} from "react-router-dom"
import axios from 'axios';
import MapComponent from './MapComponent';
import "./Explore.css"
export default function Explore()
{
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);
  const[attractions,setattractions]=useState([])
  const[attractionPage,setattractionPage]=useState(false)
    

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLatitude(position.coords.latitude);
            setLongitude(position.coords.longitude);
          },
          (error) => {
            setError(error.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    fetchLocation();

    return () => {
      // Clean up any resources (optional)
    };
  }, []); 
     // Function to fetch nearby tourist spots using Overpass API
async function fetchNearbyTouristSpots(latitude, longitude) {
  console.log(latitude,longitude)
    const radius = 1000; // Radius in meters (adjust as needed)
    setattractionPage(true)
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[tourism];out;`;

    try {
        const response = await fetch(url);
        console.log(response)
        const data = await response.json();
        setattractions(data.elements.map(element => ({
          name: element.tags.name || 'Unnamed',
          type: element.tags.tourism
        })).filter(element => element.type == 'museum' || element.type == 'attraction')) // Filter out hotels
      } catch (error) {
        console.error('Error fetching nearby tourist spots:', error);
        
      }
  }
  console.log(attractions)
  //  function displayAttractions(){
  //   const latitude = 40.7128; // Example: latitude of New York City
  //   const longitude = -74.0060; // Example: longitude of New York City
  
  //   fetchNearbyTouristSpots(latitude, longitude)
  //     .then(touristSpots => {
  //       console.log('Nearby tourist spots:', touristSpots);
        
  //     })
  //     .catch(error => {
  //       console.error('Error:', error);
        
  //     });
  
    
  //  } 
  

  //   function getEmergencyNumbers(latitude, longitude) {
  //     const apiKey = 'your_api_key_here';
  //     const url = `https://example.com/emergency_numbers?lat=${latitude}&lon=${longitude}&apikey=${apiKey}`;
  
  //     fetch(url)
  //         .then(response => {
  //             if (!response.ok) {
  //                 throw new Error('Network response was not ok');
  //             }
  //             return response.json();
  //         })
  //         .then(data => {
  //             // Parse the response to extract emergency numbers
  //             const emergencyNumbers = data.emergency_numbers;
  //             console.log("Emergency Numbers:");
  //             for (const [numberType, number] of Object.entries(emergencyNumbers)) {
  //                 console.log(`${numberType}: ${number}`);
  //             }
  //         })
  //         .catch(error => {
  //             console.error('There was a problem fetching emergency numbers:', error);
  //         });
  // }
  
 
    
    
    
      
      
      return (
        <div>
          <button onClick={()=>{fetchNearbyTouristSpots(40.7128,-74.0060)}}>Nearby Attractions</button>
          {!attractionPage&&<MapComponent />}
          {attractionPage&&
          <Attractions data={attractions}/>
          }
        </div>
      ); 
}
function Attractions({ data}) {
  return (
    <>
    
    <div>
        <h2>Nearby Attractions</h2>
        <table className="my-table">
          <thead>
            <tr>
              <th>Attraction</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
          {data.map((item)=>
                    (   
                      <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.type}</td>
                
              </tr>
                    ))}
          </tbody>
        </table>
      </div>
    </>
  );
}