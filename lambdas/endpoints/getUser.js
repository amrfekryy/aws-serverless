const Responses = require('../common/API_Responses')
const { withApiHooks } = require('../common/hooks/api')

exports.handler = withApiHooks(async event => {

    const ID = event.pathParameters.ID

    if(!ID) {
        return Responses._400({message: 'Missing the ID from the path'})
    }
    if(data[ID]) {
        return Responses._200(data[ID])
    }
    return Responses._400({message: 'No ID in data'})
})

const data = {
    1: {name: 'Amr', age: 12, job: 'Developer'},
    2: {name: 'Amr', age: 12, job: 'Developer'},
    3: {name: 'Amr', age: 12, job: 'Developer'},
    4: {name: 'Amr', age: 12, job: 'Developer'},
}