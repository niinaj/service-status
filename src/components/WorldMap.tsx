import React from 'react';
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import ServiceData from '../assets/js/service-data.json';
import '../assets/css/components/world-map.scss';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function WorldMap() {
  return (
    <section className="service-map">
      <MapMarkers />
      <MapBackground />
    </section>
  );
}

function MapBackground() {
  return (
    <div className="service-map__background">
      <ComposableMap 
        projection="geoMercator"
        projectionConfig={{
          center: [0, 10],
          scale: 140,
      }}
      >
        <Geographies 
          geography={geoUrl}
          fill="#ffffff"
          stroke="#d5d8da"
          >
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}

function MapMarkers() {
  return (
    <div className="service-map__markers">
      {ServiceData.services.map((data) => {
        return (
          <div key={data.name} className={'service-map__marker ' + data.aws_region + ' state--' + data.state}>
            <div className="service-map__marker__inner">
            <p>{data.name}</p>
            <p>{data.state}</p>
            </div>
            <div className={ 'service-map__state service-map__state--' + data.state}></div>
          </div>
        )
      })}
    </div>
  )
}

export default WorldMap;
