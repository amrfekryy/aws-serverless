const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')

const tableName = process.env.tableName


exports.handler = async event => {
    console.log('even', event)

    const {pathParameters} = event

    if(!pathParameters || !pathParameters.ID) {
        return Responses._400({message: 'Missing the ID from the path'})
    }

    const {ID} = pathParameters
    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('Error in Dynamo GET', err);
        return null
    })
    if (!user) {
        return Responses._400({message: 'Faild to get user by ID'})
    }

    return Responses._200({ user })
}
