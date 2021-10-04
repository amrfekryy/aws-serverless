const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const { withApiHooks } = require('../common/hooks/api')

const tableName = process.env.tableName

exports.handler = withApiHooks(async event => {
    
    const ID = event.pathParameters.ID

    if(!ID) {
        return Responses._400({message: 'Missing the ID from the path'})
    }

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('Error in dynamo get', err);
        return null
    })
    if (!user) {
        return Responses._400({message: 'Faild to get user by ID'})
    }

    return Responses._200({ user })
})
