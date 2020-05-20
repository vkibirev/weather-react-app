import {
  FETCH_CITY_DATA_REQUEST,
  FETCH_CITY_DATA_REQUEST_SUCCESS,
  FETCH_CITY_DATA_REQUEST_FAILURE,
  FETCH_CITIES_LIST_REQUEST,
  FETCH_CITIES_LIST_REQUEST_FAILURE,
  FETCH_CITIES_LIST_REQUEST_SUCCESS,
  UPDATE_CITY_REQUEST,
  UPDATE_CITY_REQUEST_SUCCESS,
  UPDATE_CITY_REQUEST_FAILURE,
  DELETE_CITY,
  // FETCH_ONE_CITY,
  // FETCH_ONE_CITY_SUCCESS,
  // FETCH_ONE_CITY_FAILURE
} from './action-types'

const cityRequested = () => {
  return {
    type: FETCH_CITY_DATA_REQUEST,
  }
}

const cityDataLoaded = (city) => {
  return {
    type: FETCH_CITY_DATA_REQUEST_SUCCESS,
    payload: city,
  }
}

const cityError = (error) => {
  return {
    type: FETCH_CITY_DATA_REQUEST_FAILURE,
    payload: error,
  }
}

const citiesListRequested = () => {
  return {
    type: FETCH_CITIES_LIST_REQUEST,
  }
}

const citiesListLoaded = (citiesList) => {
  return {
    type: FETCH_CITIES_LIST_REQUEST_SUCCESS,
    payload: citiesList,
  }
}

const citiesListError = (error) => {
  return {
    type: FETCH_CITIES_LIST_REQUEST_FAILURE,
    payload: error,
  }
}

const updateCityRequested = () => {
  return {
    type: UPDATE_CITY_REQUEST,
  }
}

const updateCityLoaded = () => {
  return {
    type: UPDATE_CITY_REQUEST_SUCCESS,
  }
}

const updateCityError = () => {
  return {
    type: UPDATE_CITY_REQUEST_FAILURE,
  }
}

const deleteCity = (city) => {
  return {
    type: DELETE_CITY,
    payload: city,
  }
}

const fetchCity = (weatherService) => (city) => (dispatch) => {
  dispatch(cityRequested())
  weatherService
    .getCityData(city)
    .then((data) => dispatch(cityDataLoaded(data)))
    .catch((err) => dispatch(cityError(err)))
}

const fetchCitiesList = (weatherService) => (ids) => (dispatch) => {
  dispatch(citiesListRequested())
  weatherService
    .getCitiesList(ids)
    .then((data) => dispatch(citiesListLoaded(data)))
    .catch((err) => dispatch(citiesListError(err)))
}

const updateCityData = (weatherService) => (city) => (dispatch) => {
  dispatch(updateCityRequested())
  weatherService
    .getCityData(city)
    .then((data) => dispatch(updateCityLoaded(data)))
    .catch((err) => dispatch(updateCityError(err)))
}

export { fetchCity, fetchCitiesList, updateCityData, deleteCity }
