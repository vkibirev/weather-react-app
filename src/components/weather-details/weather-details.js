import React, { useEffect } from 'react'
import { Item, Segment, Button } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { compose } from '../../utils'
import { withWeatherService } from '../hoc'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCity } from '../../actions'
import _ from 'lodash'
import moment from 'moment'

const WeatherDetails = ({ cityName, fetchCity, city }) => {
  useEffect(() => {
    fetchCity(cityName)
  }, [])

  if (!city) return <Segment>Something went wrong, please try again</Segment>
  return (
    <Segment>
      <Item.Group>
        <Item>
          <Item.Image size="tiny" src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />

          <Item.Content>
            <Item.Header as="h3">{city.name}</Item.Header>
            <Item.Meta>{city.sys.country}</Item.Meta>
            <Item.Extra>Weather Details</Item.Extra>
            <Item.Description>
              <strong>Temperature:</strong> {city.main.temp}
            </Item.Description>
            <Item.Description>
              <strong>Feels Like:</strong> {city.main.feels_like}
            </Item.Description>
            <Item.Description>
              <strong>Humidity:</strong> {city.main.humidity}
            </Item.Description>
            <Item.Description>
              <strong>Pressure:</strong> {city.main.pressure}
            </Item.Description>
            <Item.Description>
              <strong>Wind speed:</strong> {city.wind.speed}
            </Item.Description>
            <Item.Description>
              <strong>Sunrise:</strong> {moment.unix(city.sys.sunrise).format('h:mm:ss A')}
            </Item.Description>
            <Item.Description>
              <strong>Sunset:</strong> {moment.unix(city.sys.sunset).format('h:mm:ss A')}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>
      <div>
        <Button as={Link} to="/" content="Back" icon="left arrow" labelPosition="left" />
      </div>
    </Segment>
  )
}

const mapStateToProps = (state, { id }) => {
  return {
    city: _.find(state.cities, { id: +id }),
    loading: state.loading,
    error: state.error,
  }
}

const mapDispatchToProps = (dispatch, { weatherService }) => {
  return bindActionCreators(
    {
      fetchCity: fetchCity(weatherService),
    },
    dispatch,
  )
}

export default compose(withWeatherService(), connect(mapStateToProps, mapDispatchToProps))(WeatherDetails)
