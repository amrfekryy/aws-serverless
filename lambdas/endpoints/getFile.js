const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')
const { withApiHooks } = require('../common/hooks/api')

const bucket = process.env.bucketName


exports.handler = withApiHooks(async event => {

    const fileName = event.pathParameters.fileName

    if(!fileName) {
        return Responses._400({message: 'Missing the fileName from the path'})
    }

    const file = await S3.get(fileName, bucket).catch(err => {
        console.log('Error in S3 get', err);
        return null
    })

    if (!file) {
        return Responses._400({message: 'Faild to read data by fileName'})
    }

    return Responses._200({ file })
})
