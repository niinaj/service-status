import React, { useState } from 'react';
import Moment from "moment";

import ServiceData from '../assets/js/service-data.json';

import {ReactComponent as IconOK} from '../assets/icons/icon-ok.svg';
import {ReactComponent as IconAlert} from '../assets/icons/icon-alert.svg';
import {ReactComponent as IconFailure} from '../assets/icons/icon-failure.svg';

function RenderMapTooltips() {
    return (
        <div className="service-map__markers">
        {ServiceData.services.map((data, index) => {

            const serState = data.state;
            const serName = data.name;
            const serRegion = data.aws_region;
            const serUpdated = data.updated;

            return (   
                <MapTooltip key={index} serState={serState} serName={serName} serRegion={serRegion} serUpdated={serUpdated} />
            )
        })
        }
        </div>    
    )
}
  
function MapTooltip ({index, serState, serName, serRegion, serUpdated} : any) {

    const [isOpen, setIsOpen] = useState(false);

    const openTooltip = () => {
        setIsOpen(!isOpen);
    }

    const closeTooltip = () => {
        setIsOpen(false);
    }

    return (   
        <div key={serName} className={`service-map__marker marker-${index} ${serRegion} state--${serState} ${isOpen ? 'is-open' : ''}`}>
          <div className={`service-map__tooltip`}>
            <div className="service-map__tooltip__icon">  
              <TooltipIcon serviceState={serState} />
            </div> 
            <div className="service-map__tooltip__content">
              <FormattedRegion region={serRegion} />
              <h3>{serName}</h3>
              <ServiceStateDescription serviceState={serState} />
              <FormattedDate updated={serUpdated} />
            </div>
            <button className="close-button" onClick={closeTooltip}>×</button>
          </div>
          <div 
              className={`service-map__state service-map__state--${serState}`}
              onClick={openTooltip}
          >
          </div>
        </div>
      )
}


function TooltipIcon(props: any) {
  
    if(props.serviceState === "ok") {
      return <IconOK />
    } else if (props.serviceState === "alarm") {
      return <IconAlert />
    } else {
      return <IconFailure />
    }
}
  
function ServiceStateDescription(props: any) {
  
    let description;
    
    if(props.serviceState === "ok") {
      description = "Service is fully functional."
    } else if (props.serviceState === "alarm") {
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

export default RenderMapTooltips;