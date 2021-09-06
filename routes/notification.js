var express = require('express');
var router = express.Router();
const {processingSensor, processingEditData, processingUpdateData, processingNewData, processingDeleteData} = require('./rawData')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('API NOTIFICATION');
});

router.get('/create', processingSensor);

  router.post('/', processingNewData);

  router.get('/:id/edit', processingEditData);

  router.get('/:id/show', function(req, res, next) {
    res.send('API NOTIFICATION SHOW DATA EDITABLE');
  });

  router.put('/:id/update', processingUpdateData);

  router.delete('/:id', processingDeleteData);

 

module.exports = router;
