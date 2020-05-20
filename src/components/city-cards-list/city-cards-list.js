import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCitiesList } from '../../actions'
import { compose } from '../../utils'
import { withWeatherService } from '../hoc'
import CityCard from '../city-card'
import { Card, Dimmer, Loader } from 'semantic-ui-react'

const CityCardList = ({ cities, savedCities, fetchCitiesList, loading }) => {
  useEffect(() => {
    if (savedCities.length) {
      fetchCitiesList(savedCities)
    }
  }, [])

  const checkCities = !cities.length ? (
    <Card>
      <Card.Content>No added cities</Card.Content>
    </Card>
  ) : (
    ''
  )

  return (
    <Card.Group centered>
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
      {checkCities}
      {cities.map((city) => {
        return <CityCard key={city.id} city={city} />
      })}
    </Card.Group>
  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    savedCities: state.savedCities,
    loading: state.loading,
  }
}

const mapDispatchToProps = (dispatch, { weatherService }) => {
  return bindActionCreators(
    {
      fetchCitiesList: fetchCitiesList(weatherService),
    },
    dispatch,
  )
}

export default compose(withWeatherService(), connect(mapStateToProps, mapDispatchToProps))(CityCardList)
