var express = require('express');
var router = express.Router();
const db = require('../db.js')
ObjectID = require('mongodb').ObjectID

/* GET users listing. */
router.get('/', async function (req, res, next) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const docs = await games.find().toArray();
  res.send(docs)
});

router.post('/', async function (req, res, next) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const resp = await games.insertOne(req.body);
  res.send(resp);
});

module.exports = router;
