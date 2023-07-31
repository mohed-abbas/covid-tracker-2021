import React from 'react';
import { MapContainer , TileLayer } from 'react-leaflet'
import "./Map.css";
import { Circle, Popup } from 'react-leaflet';
import { showDataOnMap } from "./util";
function Map({countries, casesType, center, zoom}) {

    const casesTypeColors = {
        cases: {
          hex: "#CC1034",
          multiplier: 100,
        },
        recovered: {
          hex: "#7dd71d",
          multiplier: 600,
        },
        deaths: {
          hex: "#fb4443",
          multiplier: 800,
        },
      };
    console.log(zoom)
    return (
        <div className="map">
            <MapContainer className="leafletMap__container" center={center} zoom={zoom}>
            <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {countries.map((country) => {
            return <Circle
                center={[country.countryInfo.lat, country.countryInfo.long]}
                color={casesTypeColors[casesType].hex}
                fillColor={casesTypeColors[casesType].hex}
                fillOpacity={0.4}
                radius={Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier}
            >
                <Popup>
                <p> <img alt='Country Flag' style={{objectFit: "contain"}} width="100%" height="30px" src={country.countryInfo.flag}/></p>
                <span>Country: {country.country}</span>
                <p>Active Cases: {country.cases}</p>
                <p>Total deaths: <span style={{fontWeight: "bolder"}}>{country.deaths}</span></p>
                </Popup>
            </Circle>
        })}
    </MapContainer>
        </div>
    )
}

export default Map
