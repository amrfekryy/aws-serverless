const Responses = require('../common/API_Responses')
const { withApiHooks } = require('../common/hooks/api')

exports.handler = withApiHooks(async event => {
  return Responses._200()
})
