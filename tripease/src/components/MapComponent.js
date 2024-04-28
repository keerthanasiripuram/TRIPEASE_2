
/*import React, { useEffect } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM class from OpenLayers

function MapComponent() {
  useEffect(() => {
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

    // Clean up function to remove the map when the component unmounts
    return () => {
      map.setTarget(null);
    };
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default MapComponent;
*/

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
function MapComponent() {
  useEffect(() => {
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
            src: 'data:image/jpeg;base64,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',
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
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div id="map" style={{ width: '100%', height: '400px' }}></div>
  );
}

export default MapComponent;

/*
import React, { useState } from 'react';
import 'ol/ol.css'; // Import OpenLayers CSS
import Map from 'ol/Map'; // Import Map class from OpenLayers
import View from 'ol/View'; // Import View class from OpenLayers
import TileLayer from 'ol/layer/Tile'; // Import TileLayer class from OpenLayers
import OSM from 'ol/source/OSM'; // Import OSM class from OpenLayers
import { fromLonLat } from 'ol/proj'; // Import fromLonLat function from OpenLayers

function MapComponent() {
  const [place, setPlace] = useState('');
  const [coordinates, setCoordinates] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
      const data = await response.json();
      if (data && data.length > 0) {
        const { lat, lon } = data[0];
        setCoordinates([parseFloat(lon), parseFloat(lat)]);
      } else {
        setCoordinates(null);
        console.log('Place not found');
      }
    } catch (error) {
      console.error('Error searching for place:', error);
    }
  };

  return (
    <div>
      <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter a place" />
      <button onClick={handleSearch}>Search</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      {coordinates && (
        <p>Coordinates: {coordinates[1]}, {coordinates[0]}</p>
      )}
      {coordinates && <MapDisplay coordinates={coordinates} />}
    </div>
  );
}

function MapDisplay({ coordinates }) {
  if (!coordinates) {
    return null;
  }

  const center = fromLonLat(coordinates);

  
  return (
    <Map>
      <View center={center} zoom={12} />
      <TileLayer source={new OSM()} />
    </Map>
  );
}

export default MapComponent;*/
/*
import React, { useState } from 'react';
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
import { Icon, Style } from 'ol/style'; // Import Icon and Style classes from OpenLayers

function MapComponent() {
  const [place, setPlace] = useState('');
  const [destination, setDestination] = useState('');
  const [currentCoordinates, setCurrentCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);

  const handleSearch = async () => {
    try {
      const responsePlace = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${place}`);
      const dataPlace = await responsePlace.json();
      if (dataPlace && dataPlace.length > 0) {
        const { lat, lon } = dataPlace[0];
        setCurrentCoordinates([parseFloat(lon), parseFloat(lat)]);
      } else {
        setCurrentCoordinates(null);
        console.log('Place not found');
      }

      const responseDestination = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${destination}`);
      const dataDestination = await responseDestination.json();
      if (dataDestination && dataDestination.length > 0) {
        const { lat, lon } = dataDestination[0];
        setDestinationCoordinates([parseFloat(lon), parseFloat(lat)]);
      } else {
        setDestinationCoordinates(null);
        console.log('Destination not found');
      }
    } catch (error) {
      console.error('Error searching for place:', error);
    }
  };

  return (
    <div>
      <input type="text" value={place} onChange={(e) => setPlace(e.target.value)} placeholder="Enter current place" />
      <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Enter destination place" />
      <button onClick={handleSearch}>Search</button>
      <div id="map" style={{ width: '100%', height: '400px' }}></div>
      <MapDisplay currentCoordinates={currentCoordinates} destinationCoordinates={destinationCoordinates} />
    </div>
  );
}

function MapDisplay({ currentCoordinates, destinationCoordinates }) {
  const center = currentCoordinates ? fromLonLat(currentCoordinates) : [0, 0];
    console.log(center)
  const map = new Map({
    target: 'map',
    layers: [
      new TileLayer({
        source: new OSM()
      })
    ],
    view: new View({
      center: center,
      zoom: 10
    })
  });

  // Add marker for current place
  if (currentCoordinates) {
    const currentMarker = new Feature({
      geometry: new Point(fromLonLat(currentCoordinates))
    });
    const currentMarkerStyle = new Style({
      image: new Icon({
        src: 'https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v6.0.1/examples/data/icon.png'
      })
    });
    currentMarker.setStyle(currentMarkerStyle);

    const currentVectorSource = new VectorSource({
      features: [currentMarker]
    });
    const currentVectorLayer = new VectorLayer({
      source: currentVectorSource
    });

    map.addLayer(currentVectorLayer);
  }

  // Add marker for destination place
  if (destinationCoordinates) {
    const destinationMarker = new Feature({
      geometry: new Point(fromLonLat(destinationCoordinates))
    });
    const destinationMarkerStyle = new Style({
      image: new Icon({
        src: 'https://cdn.rawgit.com/openlayers/openlayers.github.io/master/en/v6.0.1/examples/data/icon.png'
      })
    });
    destinationMarker.setStyle(destinationMarkerStyle);

    const destinationVectorSource = new VectorSource({
      features: [destinationMarker]
    });
    const destinationVectorLayer = new VectorLayer({
      source: destinationVectorSource
    });

    map.addLayer(destinationVectorLayer);
  }

  return null; // Map is rendered outside of the React component
}

export default MapComponent;*/
