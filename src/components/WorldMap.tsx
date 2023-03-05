import React from 'react';
import { ComposableMap, Geographies, Geography} from "react-simple-maps";

import ServiceData from '../assets/js/service-data.json';

import '../assets/css/components/world-map.scss';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

const iconOk : string = require('../assets/icons/icon-ok.svg').default;
const iconAlert : string = require('../assets/icons/icon-alert.svg').default;
const iconFailure : string = require('../assets/icons/icon-failure.svg').default;

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

        const serviceState = data.state;

        return (   
          <div key={data.name} className={'service-map__marker ' + data.aws_region + ' state--' + data.state}>
            <div className="service-map__tooltip">
              <div className="service-map__tooltip__icon">
              <TooltipIcon serviceState={serviceState} />
              </div> 
              <div className="service-map__tooltip__content">
                <h3>{data.name}</h3>
                <p>{data.state}</p>
              </div>
            </div>
            <div className={ 'service-map__state service-map__state--' + data.state}></div>
          </div>
        )
      })}
    </div>
  )
}

function TooltipIcon(props: any) {

  let imgSrc;
  
  if(props.serviceState == "ok") {
    imgSrc = iconOk
  } else if (props.serviceState == "alarm") {
    imgSrc = iconAlert
  } else {
    imgSrc = iconFailure
  }

  return <img src={imgSrc} className={'state--' + props.serviceState} alt="" />

}

export default WorldMap;
