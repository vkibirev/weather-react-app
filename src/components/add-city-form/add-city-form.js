import React, { useEffect, useState } from 'react'
import { Button, Form, Message, Dimmer, Loader } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withWeatherService } from '../hoc'
import { compose } from '../../utils'
import { fetchCity } from '../../actions'

const AddCityForm = ({ fetchCity, cities, loading, error, savedCities }) => {
  const [city, setCity] = useState('')
  const [existingCityWarn, setExistingCityWarn] = useState(false)

  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(savedCities))
  }, [savedCities])

  const handleCityNameChange = (e) => {
    setCity(e.target.value)
    setExistingCityWarn(false)
  }

  const handleFetchCity = () => {
    const existingCity = cities.find((c) => city.trim().toLowerCase() === c.name.toLowerCase())

    if (existingCity) {
      setExistingCityWarn(true)
      setCity('')
    } else {
      fetchCity(city)
      setCity('')
    }
  }

  return (
    <Form warning error>
      <Dimmer active={loading} inverted>
        <Loader />
      </Dimmer>
      <Form.Field>
        <label>Add city</label>
        <input placeholder="Write city name" onChange={handleCityNameChange} value={city} />
      </Form.Field>
      {existingCityWarn && <Message warning header="Please check it." list={['Entered city is already in the list']} />}
      {error && <Message error header="Something went wrong" content={error.message} />}

      <Button type="submit" onClick={handleFetchCity} disabled={!city}>
        Add city
      </Button>
    </Form>
  )
}

const mapStateToProps = (state) => {
  return {
    cities: state.cities,
    loading: state.loading,
    error: state.error,
    savedCities: state.savedCities,
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

export default compose(withWeatherService(), connect(mapStateToProps, mapDispatchToProps))(AddCityForm)
