const Responses = require('../common/API_Responses')
const S3 = require('../common/S3')
const { withApiHooks } = require('../common/hooks/api')

const bucket = process.env.bucketName


exports.handler = withApiHooks(async event => {
    const fileName = event.pathParameters.fileName

    if(!fileName) {
        return Responses._400({message: 'Missing the fileName from the path'})
    }
    
    const data = event.body

    const newData = await S3.write(data, fileName, bucket).catch(err => {
        console.log('Error in S3 write', err);
        return null
    })

    if (!newData) {
        return Responses._400({message: 'Faild to write data by fileName'})
    }

    return Responses._200({ newData })
})
