import React, { useEffect, useRef, useState } from 'react'
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { CustomMarker } from '../components'
import { getMarkerInfo } from './helper'
import { INITIAL_POSITION, navControlStyle, API_KEY } from './constants'
import './main.css'

const MainPage = () => {
  const [markers, setMarkers] = useState([])
  const [viewport, setViewport] = useState({
    latitude: INITIAL_POSITION.latitude,
    longitude: INITIAL_POSITION.longitude,
    zoom: 11
  });
  const inputRef = useRef()

  useEffect(() => {
    const marks = localStorage.getItem('markers');
    marks && setMarkers(JSON.parse(marks))
  }, [])

  const handleMapClick = (event) => {
    if(!event?.type){
      const marks = markers.filter((marker) => markers.longitude !== event.longitude && marker.latitude !== event.latitude)
      setMarkers(marks)
    }
    else {
      event.leftButton && 
        setMarkers([
          ...markers,
          {
          latitude: event?.lngLat[1],
          longitude: event?.lngLat[0],
        }])
    }
  }

  const cleanTextAndSetMarkers = (markersSplited, markerText) => {
    if(markersSplited.length > 0){
      const finalMarker = markersSplited.map((marker) => getMarkerInfo(marker))
      setMarkers(finalMarker.concat(markers))
      inputRef.current.value = ''
      alert('Successfully Added Markers!')
    }else {
      setMarkers([
        ...markers,
        getMarkerInfo(markerText)
      ])
      inputRef.current.value = ''
      alert('Successfully Added Marker!')
    }
  }

  const addMarker = (event) => {
    event.preventDefault()
    if(event?.target?.elements?.batch?.value){
      const markerText = event.target.elements.batch.value.trim()
      const markersSplited = markerText.split('\n')
      cleanTextAndSetMarkers(markersSplited, markerText)
    }
  }

  const handleColorChange = (position) => {
    const index = markers.findIndex((marker) => marker.longitude === position.longitude  && marker.latitude === position.latitude)
    let updateMarkers = [...markers]
    updateMarkers[index] = position
    setMarkers(updateMarkers)
  }

  const saveMarkers = () => {
    localStorage.setItem('markers', JSON.stringify(markers));
    alert('Successfully saved Markers!')
  }

  return (
    <div className="main">
      <div className="mapContainer">
        <ReactMapGL
          mapboxApiAccessToken={API_KEY}
          {...viewport}
          width="100%"
          height="100vh"
          mapStyle={"mapbox://styles/mapbox/light-v8"}
          onClick={handleMapClick}
          onViewportChange={(viewport) => setViewport(viewport)}
        >
          {markers.map((marker) => <CustomMarker handleRemoveMarker={handleMapClick} colorChange={handleColorChange} position={marker} />)}
          <NavigationControl style={navControlStyle} />
        </ReactMapGL>
      </div>
      <div className="controls">
        <form onSubmit={addMarker} >
          <textarea ref={inputRef} rows="5" cols="45" name="batch" />
          <br/>
          <button type="submit"  id='add' className="add-btn">Add Marker</button>
        </form>
        <button id='save' className="add-btn" onClick={saveMarkers}>Save Marker</button>
      </div>
    </div>
  );
}

export default MainPage
