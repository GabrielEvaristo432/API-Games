var express = require('express');
var router = express.Router();
const db = require('../db.js');
ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const docs = await games.find().toArray();
  res.send(docs)
});

router.get('/:id', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const docs = await games.find({ _id: new ObjectID(req.params.id) }).toArray();
  res.send(docs)
});

router.post('/', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const resp = await games.insertOne(req.body);
  res.send(resp);
});

router.post('/delete', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const resp = await games.remove({});
  res.send(resp);
});

router.post('/delete/:id', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const docs = await games.remove({ _id: new ObjectID(req.params.id) })
  res.send(docs)
});

router.post('/update/:id', async function (req, res) {
  const conn = await db.connect();
  const games = conn.collection('game');
  const nome = req.body.nome;
  const metascore = req.body.metascore;
  const userscore = req.body.userscore;
  const dev = req.body.dev;
  const id = {_id: new ObjectID(req.params.id)};
  const docs = await games.updateOne( 
    id, {$set: {
      nome: nome, 
      metascore: metascore, 
      userscore: userscore,
      dev: dev
    }})
  res.send(docs)
});

module.exports = router;
