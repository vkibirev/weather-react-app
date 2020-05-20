import React from 'react'
import { Header, Segment } from 'semantic-ui-react'
import AddCityForm from '../add-city-form'
import CityCardList from '../city-cards-list'

const MainPage = () => {
  return (
    <>
      <Header as="h3">Weather react app</Header>
      <AddCityForm />
      <Segment>
        <CityCardList />
      </Segment>
    </>
  )
}

export default MainPage
