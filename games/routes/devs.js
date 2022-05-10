var express = require('express');
var router = express.Router();
const db = require('../db.js');
ObjectID = require('mongodb').ObjectID;

/* GET users listing. */
router.get('/', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const docs = await devs.find().toArray();
  res.send(docs)
});

router.get('/:id', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const docs = await devs.find({ _id: new ObjectID(req.params.id) }).toArray();
  res.send(docs)
});

router.get('/:id/games', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('game');
  const docs = await devs.find({dev: req.params.id}).toArray();
  res.send(docs)
});

router.post('/', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const resp = await devs.insertOne(req.body);
  res.send(resp);
});

// router.post('/:id/games', async function (req, res) {
//   const conn = await db.connect();
//   const devs = conn.collection('devs');
//   const jogos = req.body.jogos;
//   const id = { _id: new ObjectID(req.params.id) }
//   const docs = await devs.updateOne(id, {$set: {jogos: jogos}}).toArray();
//   res.send(docs)
// });

router.post('/delete', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const resp = await devs.remove({});
  res.send(resp);
});

router.post('/delete/:id', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const docs = await devs.remove({ _id: new ObjectID(req.params.id) })
  res.send(docs)
});

router.post('/update/:id', async function (req, res) {
  const conn = await db.connect();
  const devs = conn.collection('devs');
  const nome = req.body.nome;
  const sede = req.body.sede;
  const ceo = req.body.ceo;
  const jogos = req.body.jogos;
  const id = { _id: new ObjectID(req.params.id) };
  const docs = await devs.updateOne(
    id, {
      $set: {
        nome: nome,
        sede: sede,
        ceo: ceo,
        jogos: jogos
      }
  })
  res.send(docs)
});

module.exports = router;
