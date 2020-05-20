import {
  FETCH_CITY_DATA_REQUEST,
  FETCH_CITY_DATA_REQUEST_FAILURE,
  FETCH_CITY_DATA_REQUEST_SUCCESS,
  FETCH_CITIES_LIST_REQUEST,
  FETCH_CITIES_LIST_REQUEST_SUCCESS,
  FETCH_CITIES_LIST_REQUEST_FAILURE,
  UPDATE_CITY_REQUEST,
  UPDATE_CITY_REQUEST_SUCCESS,
  UPDATE_CITY_REQUEST_FAILURE,
  DELETE_CITY,
  // FETCH_ONE_CITY,
  // FETCH_ONE_CITY_SUCCESS,
  // FETCH_ONE_CITY_FAILURE,
} from '../actions/action-types'

const initialState = {
  cities: [],
  loading: false,
  updating: false,
  error: null,
  savedCities: JSON.parse(localStorage.getItem('savedCities')) || [],
  city: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CITY_DATA_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case FETCH_CITY_DATA_REQUEST_SUCCESS: {
      const city = action.payload
      const existingCity = state.cities.find((c) => city.id === c.id)
      //this check added to prevent situation when for different city name spelling we get the same response
      // (f.e. lviv / lvov)
      if (existingCity) {
        const cities = state.cities.map((c) => (c.id === city.id ? city : c))
        return {
          ...state,
          cities,
        }
      } else {
        return {
          ...state,
          cities: [...state.cities, action.payload],
          loading: false,
          error: null,
          savedCities: state.savedCities.includes(city.id)
            ? [...state.savedCities]
            : [...state.savedCities, action.payload.id],
        }
      }
    }

    case FETCH_CITY_DATA_REQUEST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case FETCH_CITIES_LIST_REQUEST: {
      return {
        ...state,
        loading: true,
      }
    }

    case FETCH_CITIES_LIST_REQUEST_SUCCESS: {
      return {
        ...state,
        cities: [...action.payload.list],
        loading: false,
        error: null,
      }
    }

    case FETCH_CITIES_LIST_REQUEST_FAILURE: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      }
    }

    case UPDATE_CITY_REQUEST: {
      return {
        ...state,
        updating: true,
      }
    }

    case UPDATE_CITY_REQUEST_SUCCESS: {
      const city = action.payload
      const itemIndex = state.cities.findIndex((c) => city.id === c.id)
      const updatedCities = [...state.cities.slice(0, itemIndex), action.payload, ...state.cities.slice(itemIndex + 1)]

      return {
        ...state,
        cities: [...updatedCities],
        loading: false,
        error: null,
      }
    }

    case UPDATE_CITY_REQUEST_FAILURE: {
      return {
        ...state,
        updating: false,
        error: action.payload,
      }
    }

    case DELETE_CITY: {
      const city = action.payload
      const itemIndex = state.cities.findIndex((c) => city.id === c.id)
      const updatedCities = [...state.cities.slice(0, itemIndex), ...state.cities.slice(itemIndex + 1)]
      return {
        ...state,
        cities: [...updatedCities],
        savedCities: [...updatedCities],
      }
    }

    default:
      return state
  }
}

export default reducer
