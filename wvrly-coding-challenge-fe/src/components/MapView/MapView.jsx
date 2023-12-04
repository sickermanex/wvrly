import React, { useRef, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import mapboxgl from 'mapbox-gl';
import './MapView.css'
import { useSelector, useDispatch } from "react-redux";
// import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
 
mapboxgl.accessToken = 'pk.eyJ1Ijoic2lja2VybWFuZXgiLCJhIjoiY2xwcHFkejNsMTJhYzJxbzlmNHo1d2dheiJ9.9agQ6MKCoRK8k-3DRvEFWA';

const Marker = (props) => {
  return(
    <button className={props.class || 'marker-button'}></button>
  )
}


const MapView = (props) => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-66.1550592);
  const [lat, setLat] = useState(-17.3731255);
  const [zoom, setZoom] = useState(0);
  const dataRef = useRef(props.data);
  dataRef.current = props.data;

  const createMarker = (coords, isForInsert=false) => {
    const { lat, lon } = coords;
    const ref = React.createRef();
    const className = isForInsert ? 'marker-button insert' : null;
    ref.current = document.createElement('div');
    createRoot(ref.current).render(
      <Marker class={className}/>
    );

    new mapboxgl.Marker(ref.current)
      .setLngLat([lon, lat])
      .addTo(map.current);
  }
  
  useEffect(() => {
    if (map.current) return;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [lng, lat],
      zoom: zoom
    });

    map.current.on('load', () => {
      dataRef.current.forEach((coord) => {
        createMarker(coord);
      });
    });

    map.current.on('dblclick', (e) => {
      const {lng, lat} = e.lngLat;
      props.updateCoords(lng, lat);
      // setClickCoords([e.lngLat.lng, e.lngLat.lat]);
      // setIsModalOpen(true);
      createMarker({ lon: lng, lat }, true)
    });

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, [props.data]);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container" />
    </div>
  );
}

export default MapView;