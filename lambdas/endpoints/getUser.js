const Responses = require('../common/API_Responses')

exports.handler = async event => {
    console.log('even', event)

    const {pathParameters} = event

    if(!pathParameters || !pathParameters.ID) {
        return Responses._400({message: 'Missing the ID from the path'})
    }
    if(data[pathParameters.ID]) {
        return Responses._200(data[pathParameters.ID])
    }
    return Responses._400({message: 'No ID in data'})
}

const data = {
    1: {name: 'Amr', age: 12, job: 'Developer'},
    2: {name: 'Amr', age: 12, job: 'Developer'},
    3: {name: 'Amr', age: 12, job: 'Developer'},
    4: {name: 'Amr', age: 12, job: 'Developer'},
}