const Responses = require('../common/API_Responses')

exports.handler = async event => {
  console.log('even', event)

  return Responses._200()
}
