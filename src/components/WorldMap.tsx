import React from 'react';
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import MapTooltips from './MapTooltips';

import '../assets/css/components/world-map.scss';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

function WorldMap() {
  return (
    <section className="service-map">
      <MapTooltips />
      <MapBackground />
    </section>
  );
}

function MapBackground() {
  return (
    <div className="service-map__background">
      <ComposableMap 
        projection="geoMercator"
        width={1200}
        height={680}
        projectionConfig={{
          center: [0, 30],
          scale: 220,
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

export default WorldMap;
