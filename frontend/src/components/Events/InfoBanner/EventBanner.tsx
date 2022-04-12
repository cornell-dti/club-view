import React from "react";
import "./EventBanner.css"

type BannerProps = {
  date: string,
  name: string,
  location: string,
  startTime: string,
  endTime: string 
}



const EventBanner = ({date, name, location, startTime, endTime} : BannerProps) => {
  return(
    <div className="bannerContainer">
        {date} - {name}
        <br />
        {location} • {startTime} - {endTime}
    </div>
  )
}

export default EventBanner;