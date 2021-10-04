const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const { withApiHooks } = require('../common/hooks/api')
const yup = require('yup')

const tableName = process.env.tableName

const bodySchema = yup.object().shape({
  score: yup.number().required()
})
const pathParametersSchema = yup.object().shape({
  ID: yup.string().required(),
})


exports.handler = withApiHooks(async event => {

  const ID = event.pathParameters.ID
  const {score} = event.body

  const res = await Dynamo.update({
    tableName,
    primaryKey: 'ID', primaryKeyValue: ID,
    updateKey: 'score', updateValue: score
  })

  return Responses._200({ message: 'successful update' })
  
}, { bodySchema, pathParametersSchema })
