const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')

const bucket = process.env.bucketName


exports.handler = async event => {
    console.log('even', event)

    const {pathParameters} = event

    if(!pathParameters || !pathParameters.fileName) {
        return Responses._400({message: 'Missing the fileName from the path'})
    }
    const {fileName} = pathParameters

    const data = JSON.parse(event.body)

    const newData = await S3.write(data, fileName, bucket).catch(err => {
        console.log('Error in S3 write', err);
        return null
    })

    if (!newData) {
        return Responses._400({message: 'Faild to write data by fileName'})
    }

    return Responses._200({ newData })
}
