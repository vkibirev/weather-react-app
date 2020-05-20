import React, { useState, useEffect } from 'react'
import { compose } from '../../utils'
import { withWeatherService } from '../hoc'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateCityData, deleteCity } from '../../actions'
import { Link } from 'react-router-dom'
import { Card, Button, Image, Loader, Dimmer } from 'semantic-ui-react'

const CityCard = ({ city, updating, updateCityData, deleteCity, error }) => {
  const [itemUpdating, setItemUpdating] = useState(false)

  useEffect(() => {
    if (!updating) {
      setItemUpdating(false)
    }
  }, [updating])

  const handleUpdateData = () => {
    setItemUpdating(true)
    updateCityData(city.name)
  }

  const handleDeleteCity = () => {
    deleteCity(city)
  }

  if (error) {
    return (
      <Card>
        <Card.Content>{`Can't load data for this city`}</Card.Content>
      </Card>
    )
  }
  return (
    <Card>
      <Dimmer active={itemUpdating} inverted>
        <Loader />
      </Dimmer>
      <Card.Content as={Link} to={`/city/${city.name}/${city.id}`}>
        <Image floated="right" size="mini" src={`http://openweathermap.org/img/w/${city.weather[0].icon}.png`} />
        <Card.Header>{city.name}</Card.Header>
        <Card.Meta>
          <span className="date">{city.sys.country}</span>
        </Card.Meta>
        <Card.Description>
          <strong>Temperature:</strong> {city.main.temp}
        </Card.Description>
        <Card.Description>
          <strong>Feels Like:</strong> {city.main.feels_like}
        </Card.Description>
        <Card.Description>
          <strong>Weather:</strong> {city.weather[0].main}
        </Card.Description>
      </Card.Content>

      <Card.Content extra>
        <div className="ui two buttons">
          <Button basic color="green" onClick={handleUpdateData}>
            Update Data
          </Button>
          <Button basic color="red" onClick={handleDeleteCity}>
            Delete City
          </Button>
        </div>
      </Card.Content>
    </Card>
  )
}

const mapStateToProps = (state) => {
  return {
    updating: state.updating,
    error: state.error,
  }
}

const mapDispatchToProps = (dispatch, { weatherService }) => {
  return bindActionCreators(
    {
      updateCityData: updateCityData(weatherService),
      deleteCity: deleteCity,
    },
    dispatch,
  )
}

export default compose(withWeatherService(), connect(mapStateToProps, mapDispatchToProps))(CityCard)
