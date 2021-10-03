const AWS = require('aws-sdk')

const s3Client = new AWS.S3()

const S3 = {
    
    async get(fileName, Bucket) {
        const params = { Bucket, Key: fileName}
        const res = await s3Client.getObject(params).promise()

        if (!res) throw Error(`Error getting file ${fileName} from S3 bucket ${Bucket}`)
        
        // check it is json file
        const fileExtension = fileName.slice(fileName.length - 4, fileName.length)
        if (fileExtension === 'json') {
            // S3 response is Blob, convert to string
            return res.Body.toString()
        }
        throw Error(`Unrecognized file extension .${fileExtension}`)
    },
    async write(data, fileName, Bucket) {
        const params = { Bucket, Key: fileName, Body: JSON.stringify(data) }
        const res = await s3Client.putObject(params).promise()

        if (!res) throw Error(`Error writing file ${fileName} to S3 bucket ${Bucket}`)
        
        console.log(res);
        return res
    }
}

module.exports = S3