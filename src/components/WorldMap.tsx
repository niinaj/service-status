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

/*
function MapMarkers() {
  return (
    <div className="service-map__markers">
      {ServiceData.services.map((data) => {

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
  
  if(props.serviceState == "ok") {
    return <IconOK />
  } else if (props.serviceState == "alarm") {
    return <IconAlert />
  } else {
    return <IconFailure />
  }
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
*/

export default WorldMap;
