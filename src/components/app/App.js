import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import { WeatherDetailsPage, MainPage } from '../pages'

function App() {
  return (
    <Container style={{ margin: 20 }}>
      <Switch>
        <Route path="/" exact component={MainPage} />
        <Route
          path="/city/:name/:id"
          render={({ match }) => {
            const { name, id } = match.params
            return <WeatherDetailsPage city={name} id={id} />
          }}
          exact
        />
        <Route render={() => <h2>Page not found</h2>} />
      </Switch>
    </Container>
  )
}

export default App
