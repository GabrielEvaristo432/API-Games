const { response } = require('express');
var express = require('express');
var router = express.Router();
const db = require('../db.js');
ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const docs = await users.find().toArray();
  res.json(docs)
});

router.get('/:_id', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const _id = req.params._id;
  const doc = await users.findOne({ _id: ObjectID(_id) });
  res.json(doc)
});

router.post('/', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const response = await users.insertOne(req.body);
  res.status(201); //Recurso criado
  res.send(response);
});

router.delete('/', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const response = await users.remove({});
  if (response.deletedCount == 0) {
    res.status(404);
    res.send()
  } else {
    res.send(response);
  }
});

router.delete('/:id', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const response = await users.deleteOne({ _id: new ObjectID(req.params.id) })
  if (response.deletedCount == 0) {
    res.status(404);
    res.send()
  } else {
    res.send(response);
  }
});

router.put('/:_id', async function (req, res) {
  const conn = await db.connect();
  const users = conn.collection('users');
  const query = { _id: ObjectID(req.params._id) };
  const values = { $set: req.body }
  const doc = await users.updateOne(query, values)
  res.send(doc)
});

router.put("/", async (req, resp) => {
  const documents = req.body;

  for (let document of documents) {
    if (!("_id" in document)) {
      const response = { message: "Missing required _id property." }
      resp.status(400);
      resp.send(response);
      return
    }
  }

  const undefinedProperties = {};
  for (let document of documents) {
    for (let prop in document) {
      if (!properties.includes(prop)) {
        if (!(document._id in undefinedProperties)) {
          undefinedProperties[document._id] = [];
        }
        undefinedProperties[document._id].push(prop);
      }
    }
  }
  if (Object.entries(undefinedProperties).length > 0) {
    resp.status(400);
    resp.send({ msg: "Invalid properties", properties: undefinedProperties });
    return
  }

  const conn = await db.connect();
  const users = conn.collection("users");
  let responses = []
  for (let document of documents) {
    let _id = document._id;
    delete document._id;
    const values = { $set: document };
    console.log(values);
    const query = { _id: ObjectID(_id) };
    const response = await users.updateOne(query, values);
    responses.push(response)
  }

  resp.send(responses);

});

module.exports = router;
