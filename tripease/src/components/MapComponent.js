
import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM class from OpenLayers
import Feature from 'ol/Feature'; // Import Feature class from OpenLayers
import Point from 'ol/geom/Point'; // Import Point class from OpenLayers
import { fromLonLat } from 'ol/proj'; // Import fromLonLat function from OpenLayers
import { Vector as VectorLayer } from 'ol/layer'; // Import VectorLayer class from OpenLayers
import { Vector as VectorSource } from 'ol/source'; // Import VectorSource class from OpenLayers
import {Style, Icon } from 'ol/style'; // Import Icon class from OpenLayers
import styles from "./MapComponent.module.css"
function MapComponent() {
  useEffect(()=>{
    // Create a new Map instance
    const map = new Map({
      target: 'map', // The ID of the map container element
      layers: [
        new TileLayer({
          source: new OSM() // Create a new OpenStreetMap layer
        })
      ],
      view: new View({
        center: [0, 0], // Center coordinates (longitude, latitude)
        zoom: 2 // Zoom level
      })
    });

    // Get current location using Geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const coordinates = fromLonLat([longitude, latitude]);

        // Update map view to center on the current location
        map.getView().setCenter(coordinates);
        map.getView().setZoom(12); // Optionally adjust zoom level

        // Add a marker for the current location
        const marker = new Feature({
          geometry: new Point(coordinates)
        });

        const markerStyle = new Style({
          image: new Icon({
            src: '/assets/locator1.png',
            scale: 0.1 // Adjust icon size if needed
          })
        });

        marker.setStyle(markerStyle);

        const vectorSource = new VectorSource({
          features: [marker]
        });

        const vectorLayer = new VectorLayer({
          source: vectorSource
        });

        map.addLayer(vectorLayer);
      },
      (error) => {
        console.error('Error getting current location:', error);
      }
    );
  },[])// Empty dependency array ensures useEffect runs only once
  
  return (
    <>
    <p className={styles.heading}>Spot Your Current Location!!</p>
    <div id="map" className={styles.map}></div>
    </>
  );
}

export default MapComponent;

