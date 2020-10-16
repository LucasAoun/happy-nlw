import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom'
import mapMarkerImg from '../images/map-marker.svg'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import '../styles/pages/orphanages-map.css'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import mapIcon from '../utils/mapIcon'
import api from '../services/api'
import Orphanage from './Orphanage'


interface Orphanage{
    id: number,
    latitude: number,
    longitude: number,
    name: string
}

function OrphanagesMap(){
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    
    useEffect(()=>{
        api.get('orphanages').then(res =>{   
            setOrphanages(res.data)
        })
    }, [])

    return(
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt=""/>
                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>
           
            <footer>
                <strong>Itanhaém</strong>
                <span>São Paulo</span>
            </footer>
            </aside>
            
            <Map
                center={[-24.1889519,-46.8266616]}
                zoom={15}
                style={{width: '100%', height: '100%'}}
                >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
                
                {orphanages.map(orphanage=>{
                    return(
                <Marker
                    key= {orphanage.id}
                    icon={mapIcon}
                    position={[orphanage.latitude, orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={200} maxWidth={200} className="map-popup">
                            {orphanage.name}
                            <Link to={`/orphanages/${orphanage.id}`}>
                                 <FiArrowRight size={28} color="#FFF"/>
                            </Link>
                        </Popup>
                </Marker>
                    )
                })}
                </Map>
            

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={38} color="#fff" />
            </Link>
        </div>
    )
}

export default OrphanagesMap