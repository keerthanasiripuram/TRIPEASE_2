import React, { useEffect, useState } from "react"
import Navbar from "../../components/navbar/Navbar"
import styles from "./Hotel.module.css"
import axiosInstance from "../../interceptors/interceptor"
import {message} from "antd"
export default function Profile() {
  const [destination, setdestination] = useState("")
  const [checkIn, setcheckIn] = useState("")
  const [checkOut, setcheckOut] = useState("")
  const [checked, setChecked] = useState(false);
  const [value, setValue] = useState(50);
  const [rating, setRating] = useState(1);
  const handleClick = (value) => {
    console.log("before", value, rating)
    if (value == rating) {
      setRating(value - 1)
    }
    else {
      setRating(value);
    }
    console.log("after", value, rating)
  };
  const handleRangeChange = (event) => {
    console.log(rating)
    setValue(event.target.value);
    console.log(value)
  };
  // const handleCheckboxChange = (e) => {
  //   console.log(checked)
  //   console.log("tar",e.target.checked)
  //   setChecked(e.target.checked);

  //   console.log(checked)
  console.log(checked)

//   async function handleSubmit() {
//     console.log("submit")
//     console.log(destination, checkIn, checkOut, value, rating, checked)
//     try {
//       const response = await axiosInstance.post("http://localhost:3000/filters", {destination, checkIn, checkOut, value, rating, checked})
//       // console.log(response)
//       // console.log(response.data)
//       console.log(response.data.data.data)

//       const originalData = response.data.data.data;
//       console.log(originalData)
// // Display the data in some appropriate way, for example:
// originalData.forEach(record => {
//     console.log("Hotel Name:", record["Hotel Name"]);
//     console.log("Address:", record["Address"]);
//     console.log("Total Rooms:", record["Total Rooms"]);
// });
//       if (response.data.success) {

//         message.success(response.data.message)
//       }
//       else {

//         message.success(response.data.message)
//       }
//     }
//     catch (err) {
//       console.log(err)
//       message.error("something")
//     }
//   }
  // useEffect(()=>
  // {
  //   console.log(checkIn,checkOut,destination,value,rating,checked)
  // },[])
  async function handleSubmit() {
    console.log("submit");
    console.log(destination, checkIn, checkOut, value, rating, checked);
    try {
      // Your existing code to fetch response...
      const response = await axiosInstance.post("http://localhost:3000/filters", { destination, checkIn, checkOut, value, rating, checked });
        console.log("Response:", response.data); // Log the entire response object
      if (response.data && response.data.data && response.data.data.type === "Buffer") {
          // Convert Buffer to Uint8Array
          const bufferData = new Uint8Array(response.data.data.data);
              
          // Convert Uint8Array to string
          const jsonString = new TextDecoder().decode(bufferData);
          
          // Log the JSON string before parsing
          console.log("JSON String:", jsonString);
          console.log("type:",typeof(jsonString))
          // // Parse JSON string
          // const originalData = JSON.parse(jsonString);
          // console.log("Original Data:", originalData); // Log the parsed data
          // const originalData=jsonString.substring(7)
          // console.log(originalData)
          // Display the data in some appropriate way
          // Manually extract the array from the JSON-like string
const startIndex = jsonString.indexOf("[");
const endIndex = jsonString.lastIndexOf("]");
const jsonArrayString = jsonString.substring(startIndex, endIndex + 1);

// Convert the JSON array string to an array
const jsonArray = eval(jsonArrayString); // Using eval to execute the array string

// Output the array
console.log(jsonArray);
          jsonArray.forEach(record => {
              console.log("Hotel Name:", record['Hotel Name']);
              console.log("Address:", record['Address']);
              console.log("Total Rooms:", record['Total Rooms']);
          });
      } else {
          console.log("Response data or data.data is undefined or not a Buffer:", response.data);
          message.error("Data not found in the response");
      }
  
      // Your existing code to handle success/error messages...
  } catch (err) {
      console.error(err);
      message.error("Something went wrong");
  }
  
}




  return (
    <>
      <Navbar></Navbar>
      <div className={styles.navbarContainer}>
        <div className={styles.searchContainer}>
          <label htmlFor="img" className={styles.icon}>
            <span className="material-symbols-outlined">
              emoji_transportation
            </span>
          </label>
          <input style={{
            width: '200px',
            padding: '10px',
            fontSize: '16px',
            zIndex: "3"
          }}
            className="form-control me-2"
            type="search"
            placeholder="Enter a destination"
            aria-label="Search"
            id="img"
            value={destination}
            onChange={(e) => { setdestination(e.target.value) }} />
        </div>
        <div className={styles.dateContainer}>
          <label htmlFor="datePicker">Check In</label>
          <input
            type="date"
            id="datePicker"
            value={checkIn}
            onChange={(e) => setcheckIn(e.target.value)}
          />
          {/* <p>Selected date: {selectedDate}</p> */}
        </div>
        <div className={styles.dateContainer}>
          <label htmlFor="datePicker">Check Out</label>
          <input
            type="date"
            id="datePicker"
            value={checkOut}
            onChange={(e) => setcheckOut(e.target.value)}
          />
          {/* <p>Selected date: {selectedDate}</p> */}
        </div>
        <div className={styles.searchIcon}>
          <span className="material-symbols-outlined" style={{ fontSize: "30px" }} onClick={handleSubmit}>
            search
          </span>
        </div>
      </div>
      <div className={styles.sectionContainer}>
        <div className={styles.leftSideBar}>
          <h3 style={{ color: "white", fontFamily: "cursive", textAlign: "center" }}>Filters</h3>
          <div className={styles.alcohol}>
            <label>
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
              />
              <p style={{ display: "inline", marginLeft: "0.3rem" }}>Alcohol</p>
            </label>
          </div>
          <div className={styles.price}>
            <p>Price: {value}</p>
            <input
              type="range"
              min="0"
              max="100"
              value={value}
              onChange={handleRangeChange}
              style={{ marginTop: "-10rem" }}
            />
          </div>
          <div className={styles.rating}>
            <p>Ratings</p>
            <div className={styles.starRating}
              style={{ marginTop: "-1.5rem" }}>
              {[1, 2, 3, 4, 5].map((index) => (
                <Star
                  key={index}
                  filled={index <= rating}
                  onClick={() => handleClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
function Star({ filled, onClick }) {
  return (
    <span className={filled ? styles.filled : styles.star} onClick={onClick}>
      ★
    </span>
  );
}
