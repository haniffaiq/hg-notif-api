var express = require('express');
var router = express.Router();
const {processingSensor, processingEditData} = require('./rawData')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API NOTIFICATION');
});

router.get('/create', processingSensor);

  router.post('/', function(req, res, next) {
    res.send('API NOTIFICATION NEW DATA');
  });

  router.get('/:id/edit', processingEditData);

  router.put('/:id', function(req, res, next) {
    res.send('API NOTIFICATION UPDATE DATA');
  });

  router.delete('/:id', function(req, res, next) {
    res.send('API NOTIFICATION DELETE DATA');
  });

  router.get('/:id/show', function(req, res, next) {
    res.send('API NOTIFICATION SHOW DATA EDITABLE');
  });

module.exports = router;
