import React, { useState, useEffect } from 'react'
import { Marker } from 'react-map-gl';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const COLOR = ['red', 'green', 'blue', 'black']

const CustomMarker = ({position, handleRemoveMarker, colorChange}) => {
  const [color, setColor] = useState(position.color ? position.color : COLOR[0])

  useEffect(() => {
    position.color && setColor(position.color)
  }, [position])

  const handleIconClick = (position) => {
    const currentPosition = COLOR.indexOf(color)

    const index = currentPosition >= 0 && 
      currentPosition + 1 < COLOR.length 
      ?
        currentPosition + 1
      :
      0
    setColor(COLOR[index])
    const updatePosition = position
    updatePosition.color = COLOR[index]
    colorChange(position)
  }

  return (
    <Marker 
      key={position.latitude + position.longitude} 
      latitude={position.latitude} 
      longitude={position.longitude} 
      offsetTop={-30} 
      offsetLeft={-10}
      draggable={true}
    >
      <div onClick={() => handleIconClick(position) } onContextMenu={() => handleRemoveMarker(position)}>
        <FontAwesomeIcon color={color} size={'lg'} icon={faThumbtack} />
      </div>
    </Marker>
)};

export default CustomMarker
