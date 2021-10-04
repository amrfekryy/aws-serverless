const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const { withApiHooks } = require('../common/hooks/api')

const tableName = process.env.tableName

exports.handler = withApiHooks(async event => {
  
  const ID = event.pathParameters.ID

  if (!ID) {
    return Responses._400({ message: 'Missing the ID from the path' })
  }

  const user = event.body
  user.ID = ID

  const newUser = await Dynamo.write(user, tableName)

  if (!newUser) {
    return Responses._400({ message: 'Faild to write user by ID' })
  }

  return Responses._200({ newUser })
})
