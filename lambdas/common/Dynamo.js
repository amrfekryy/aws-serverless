const AWS = require('aws-sdk')

const documentClient = new AWS.DynamoDB.DocumentClient()

const Dynamo = {

  async get(ID, TableName) {
    const params = { TableName, Key: { ID } }
    const data = await documentClient.get(params).promise()
    if (!data || !data.Item) {
      throw Error(`Error fetching data for ID ${ID} from table ${TableName}`)
    }
    console.log(data);
    return data.Item
  },

  async write(data, TableName) {
    if (!data.ID) throw Error('No ID on the data')

    const params = { TableName, Item: data }
    const res = await documentClient.put(params).promise()

    if (!res) throw Error(`Error inserting ID ${data.ID} in table ${TableName}`)

    console.log(data);
    return data
  },

  async update({ tableName, primaryKey, primaryKeyValue, updateKey, updateValue }) {

    const params = {
      TableName: tableName,
      Key: { [primaryKey]: primaryKeyValue },
      UpdateExpression: `set ${updateKey} = :updateValue`,
      ExpressionAttributeValues: {
        ':updateValue': updateValue
      }
    }

    return documentClient.update(params).promise()
  },
}

module.exports = Dynamo