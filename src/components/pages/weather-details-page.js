import React from 'react'
import WeatherDetails from '../weather-details'

const WeatherDetailsPage = ({ city, id }) => {
  return <WeatherDetails cityName={city} id={id} />
}

export default WeatherDetailsPage
