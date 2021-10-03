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

    const user = JSON.parse(event.body)
    user.ID = ID

    const newUser = await Dynamo.write(user, tableName).catch(err => {
        console.log('Error in dynamo write', err);
        return null
    })

    if (!newUser) {
        return Responses._400({message: 'Faild to write user by ID'})
    }

    return Responses._200({ newUser })
}
