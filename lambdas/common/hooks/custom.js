

export const validateEventBody = async state => {
  const { bodySchema } = state.config

  if (!bodySchema) { // not needed anymore - the function only runs if bodySchema exists
    throw Error('missing required bodySchema for validation')
  }

  try {
    const { event } = state

    await bodySchema.validate(event.body, { strict: true })

    console.log(`yup event.body passed validation: ${event.body}`)
  } catch (error) {
    console.log(`yup error validating event.body: ${error}`)

    state.exit = true
    state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) }
  }

  return state
}

export const validatePathParameters = async state => {
  const { pathParametersSchema } = state.config

  if (!pathParametersSchema) { // not needed anymore - the function only runs if pathParametersSchema exists
    throw Error('missing required pathParametersSchema for validation')
  }

  try {
    const { event } = state

    await pathParametersSchema.validate(event.pathParameters, { strict: true })

    console.log(`yup event.pathParameters passed validation: ${event.pathParameters}`)
  } catch (error) {
    console.log(`yup error validating event.pathParameters: ${error}`)

    state.exit = true
    state.response = { statusCode: 400, body: JSON.stringify({ error: error.message }) }
  }

  return state
}