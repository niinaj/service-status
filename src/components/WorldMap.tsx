import React from 'react';
import { ComposableMap, Geographies, Geography} from "react-simple-maps";
import Moment from "moment";

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

        /* Shortcuts */
        const serState = data.state;
        const serName = data.name;
        const serRegion = data.aws_region;
        const serUpdated = data.updated;

        return (   
          <div key={serName} className={'service-map__marker ' + serRegion + ' state--' + serState}>
            <div className="service-map__tooltip">
              <div className="service-map__tooltip__icon">  
                <TooltipIcon serviceState={serState} />
              </div> 
              <div className="service-map__tooltip__content">
                <FormattedRegion region={serRegion} />
                <h3>{serName}</h3>
                <ServiceStateDescription serviceState={serState} />
                <FormattedDate updated={serUpdated} />
              </div>
            </div>
            <div className={ 'service-map__state service-map__state--' + serState}></div>
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

function ServiceStateDescription(props: any) {

  let description;
  
  if(props.serviceState == "ok") {
    description = "Service is fully functional."
  } else if (props.serviceState == "alarm") {
    description = "Service has encountered a problem."
  } else {
    description = "Service down."
  }

  return <p className="font-size--small">{description}</p>

}

function FormattedRegion(props: any) {

  let regionArr = props.region.split('-'); 
  let regionCont = regionArr[0].toUpperCase();
  let regionDir = regionArr[1];

  return (
  <span className="text--label font-size--xsmall">{regionCont} {regionDir}</span>
  )
};

function FormattedDate(props: any) {

  let lastUpdate = props.updated;

  Moment.locale('en');

  return (
  <span className="date--label font-size--xsmall">{Moment(lastUpdate).format('MM.D.YYYY h:mm:ss a')}</span>
  )
};

export default WorldMap;
