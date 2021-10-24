const getMarkerInfo = (marker) => {
    const markerInfoSplited = marker.trim().split(',')
    return {
      latitude: parseFloat(markerInfoSplited[1], 12),
      longitude: parseFloat(markerInfoSplited[0], 12),
      color: markerInfoSplited.length === 3 ? markerInfoSplited[2] : 'red'
    }
  }

export{
    getMarkerInfo
}