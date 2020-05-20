import React from 'react'
import { Message } from 'semantic-ui-react'

const ErrorIndicator = () => {
  return (
    <Message negative>
      <Message.Header>Sorry, something went terrible wrong. </Message.Header>
      <p>Please write us about it.</p>
    </Message>
  )
}

export default ErrorIndicator
