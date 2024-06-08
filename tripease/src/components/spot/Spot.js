
import axiosInstance from '../../interceptors/interceptor';
import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useLocation } from 'react-router-dom';

export default function Spot() {
  // Extract state from props.location
  
  const location = useLocation();
  console.log(location.state)
  const collectionName  = location.state || ""; // Destructure state and provide a fallback

  // State to store data received from the server
  const [data, setData] = useState([]);
  console.log("iii",collectionName)
  useEffect(() => {
    const displayFeature = async (val) => {
      try {
        const response = await axiosInstance.post("http://localhost:3000/displayFeature", { selectedFeature: val });
        
        if (response.data && response.data.data && response.data.data.type === "Buffer") {
          // Convert Buffer to Uint8Array
          const bufferData = new Uint8Array(response.data.data.data);
              
          // Convert Uint8Array to string
          const jsonString = new TextDecoder().decode(bufferData);
          
          // Log the JSON string before parsing
          console.log("JSON String:", jsonString);

          const startIndex=jsonString.indexOf("[")
          const endIndex=jsonString.indexOf("]")
          const jsonArrayString=jsonString.substring(startIndex,endIndex+1)
          const jsonArray = eval(jsonArrayString);
          setData(jsonArray)
          
        } else {
          console.log("Response data or data.data is undefined or not a Buffer:", response.data);
          message.error("Data not found in the response");
        }
      } catch (err) {
        console.error(err);
        message.error("Something went wrong");
      }
    };

    // Call displayFeature when the component mounts
    displayFeature(collectionName);
  }, [collectionName]); // Add collectionName to the dependencies array to re-run effect when it changes

  return (
    <div>
      <h2>Spot Details</h2>
      <p>Collection Name: {collectionName}</p>

      {/* Display fetched data */}
      <div>
        {data.map((record, index) => (
          <div key={index}>
            <p>Name: {record.Name}</p>
            <p>State: {record.State}</p>
            <p>Type: {record.Type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
