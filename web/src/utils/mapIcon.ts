import L from 'leaflet';
import mapMarkerImg from '../images/map-marker.svg';

const mapIcon = L.icon({
    iconUrl: mapMarkerImg,
    iconSize: [40, 48],
     iconAnchor: [29, 68],
     popupAnchor: [0, -60]
  })

export default mapIcon