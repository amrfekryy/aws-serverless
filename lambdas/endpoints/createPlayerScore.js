const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const { withApiHooks } = require('../common/hooks/api')
const yup = require('yup')

const tableName = process.env.tableName

const bodySchema = yup.object().shape({
  name: yup.string().required(),
  score: yup.number().required()
})
const pathParametersSchema = yup.object().shape({
  ID: yup.string().required(),
})


exports.handler = withApiHooks(async event => {

  const ID = event.pathParameters.ID
  const user = event.body
  user.ID = ID

  const newUser = await Dynamo.write(user, tableName)

  if (!newUser) {
    return Responses._400({ message: 'Faild to write user by ID' })
  }

  return Responses._200({ newUser })
  
}, { bodySchema, pathParametersSchema })
