import React, { useEffect,useState } from "react"
import axios from 'axios';
import MapComponent from './MapComponent';
export default function Explore()
{
    /*async function fetchTouristSpots(latitude, longitude) {
        const radius = 10; // Radius in kilometers (adjust as needed)
        const featureCode = 'S.PUB'; // Feature code for tourist spots (adjust as needed)
      
        const url = `http://api.geonames.org/findNearbyJSON?lat=${latitude}&lng=${longitude}&radius=${radius}&featureCode=${featureCode}&username=${username}`;
        try {
          const response = await fetch(url);
          const data = await response.json();
          return data.geonames;
        } catch (error) {
          console.error('Error fetching nearby tourist spots:', error);
          return [];
        }
      }
      
      // Example usage
      const latitude = 13.0393735; // Example: latitude of New York City
      const longitude = 77.619697; // Example: longitude of New York City
      const username = 'keerthana.siripuram1'
      fetchTouristSpots(latitude, longitude,username)
        .then(results => {
          console.log('Nearby tourist spots:', results);
          // Display the results to the user
        })
        .catch(error => {
          console.error('Error:', error);
        });
      */
     // Function to fetch nearby tourist spots using Overpass API
async function fetchNearbyTouristSpots(latitude, longitude) {
    const radius = 1000; // Radius in meters (adjust as needed)
  
    const url = `https://overpass-api.de/api/interpreter?data=[out:json];node(around:${radius},${latitude},${longitude})[tourism];out;`;
  
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data.elements.map(element => ({
          name: element.tags.name || 'Unnamed',
          latitude: element.lat,
          longitude: element.lon,
          type: element.tags.tourism
        })).filter(element => element.type == 'museum' || element.type == 'attraction'); // Filter out hotels
      } catch (error) {
        console.error('Error fetching nearby tourist spots:', error);
        return [];
      }
  }
  
  useEffect(() => {
    const latitude = 40.7128; // Example: latitude of New York City
    const longitude = -74.0060; // Example: longitude of New York City
  
    fetchNearbyTouristSpots(latitude, longitude)
      .then(touristSpots => {
        console.log('Nearby tourist spots:', touristSpots);
        // Display the tourist spots data to the user
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error (e.g., display a message to the user)
      });
  
    // Uncomment this block if you want to fetch the route
    /*fetchRoute()
      .then(() => {
        // Route fetched successfully
      })
      .catch(error => {
        console.error('Error:', error);
        // Handle the error (e.g., display a message to the user)
      });*/
  }, []); // Empty dependency array ensures the effect runs only once
  

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
  
 
    
    
    
      /*const [route, setRoute] = useState(null);
      const [error, setError] = useState(null);
    
      // Function to fetch route from GraphHopper API
      const fetchRoute = async () => {
        const apiKey = '7dfb6c9d-ffd8-4d4a-a96d-a1061489d0b2'; // Replace with your GraphHopper API key
        const url = `https://graphhopper.com/api/1/route?key=${apiKey}&point=51.131,12.414&point=48.224,3.867&type=json`;
    
        try {
          const response = await axios.get(url);
          setRoute(response.data);
          setError(null);
        } catch (error) {
          console.error('Error fetching route:', error);
          setError('Error fetching route. Please try again later.');
        }
      
      }*/
      
      return (
        <div>
          <MapComponent />
         {/*<button onClick={fetchRoute}>Fetch Route</button>
          {error && <div>{error}</div>}
          {route && (
            <div>
              <h2>Route:</h2>
              <p>Distance: {route.paths[0].distance} meters</p>
              <p>Time: {route.paths[0].time} seconds</p>
              <p>Points: {route.paths[0].points}</p>
              
            </div>
          )}*/}
        </div>
      );
    
    
    
    
   
}