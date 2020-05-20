import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/app'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import store from './store'

import 'semantic-ui-css/semantic.min.css'

import ErrorBoundary from './components/error-boundary'

import { WeatherServiceProvider } from './components/weather-service-context'
import WeatherService from './services/weather-service'
const weatherService = new WeatherService()

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundary>
      <WeatherServiceProvider value={weatherService}>
        <Router>
          <App />
        </Router>
      </WeatherServiceProvider>
    </ErrorBoundary>
  </Provider>,
  document.getElementById('root'),
)
