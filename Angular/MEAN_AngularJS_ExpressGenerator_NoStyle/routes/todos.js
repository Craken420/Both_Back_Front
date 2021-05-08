var express = require('express');
var router = express.Router();
var Todo = require('../models/Todo.js');

/* GET /todos listing. */
router.get('/', async function(req, res, next) {
  await Todo.find(function (err, todos) {
    if (err) return next(err);
    res.json(todos);
  });
});

router.post('/', async function(req, res, next) {
  await Todo.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/:id', async function(req, res, next) {
  await Todo.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* PUT /todos/:id */
router.put('/:id', async function(req, res, next) {
  await Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.delete('/:id', async function(req, res, next) {
  await Todo.findByIdAndRemove(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;