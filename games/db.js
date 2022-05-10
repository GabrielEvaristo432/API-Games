const { MongoClient } = require('mongodb');
const uri = "mongodb://localhost:27017/crud2"
const mongoClient = new MongoClient(uri)

async function connect() {
  if (global.db) {
    return global.db
  }

  const conn = await mongoClient.connect();
  if (!conn) {
    return new Error('Não foi possível conectar')
  } else {
    console.log('Conectado com sucesso')
  }
  global.db = conn.db('crud2')
  return global.db
}

module.exports = { connect }