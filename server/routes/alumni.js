var express = require('express');
var router = express.Router();
var _ = require('lodash')
const alumni = require('../models/alumni')
require('../models/class')
require('../models/language')
var moment = require('moment');


/* GET users listing. */
router.get('/', function (req, res, next) {
  var verified = (req.query.verified || 'true').toLowerCase() === 'true' ? true : { $ne: true }
  alumni
    .find()
    .where('verified', verified)
    .populate({ path: 'classes', populate: { path: 'languages' } })
    .lean()
    .exec((err, alum) => {
      if (err) {
        console.error("couldnt get alumn", err)
        res.status(500).send('couldnt get alumni');
      } else {
        res.json(modifyAlumniResponse(alum))
      }
    })
});

function modifyAlumniResponse(alum) {
  return alum.map(o => {
    if (o.classes) {
      o.numberOfClasses = o.classes.length
      o.languages = _(o.classes)
        .map(c => c.languages)
        .flatten()
        .map(l => l.language)
        .uniq()
        .values()
    } else {
      o.numberOfClasses = 0
      o.languages = []
    }
    delete o.classes
    return o
  })
}

router.post('/', function (req, res, next) {
  var alum = {...req.body.newAlumni};
  var Birthday = moment(alum.birthday);
  alum.birthday = Birthday.toDate();
  var newAlumni = new alumni(alum);
  var errors = [];

  function validateUrls() {
    var userGitHub = newAlumni.github;
    var re = /(?:http(s)?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9_]+)/.test(userGitHub);
    if (!re) {
      errors.push('That was not a valid Git Hub URL')
    }
  }

  function findEmptyField() {
    Object.keys(req.body.newAlumni).forEach((value) => {
      if (!newAlumni[value] || newAlumni[value].length <= 0) {
        if (!newAlumni.linkedin || !newAlumni.birthday) {
          return;
        } else {
          errors.push(value)
        }
      }
    });
  }

  validateUrls();
  findEmptyField();

  if (errors.length > 0) {
    res.status(400).send(errors.join(", \n"))
  }
  else {
    newAlumni.save(function (err, results) {
      if (err) {
        console.error("got an error for ", req.body, "error message: ", err)
        res.status(400);
      } else {
        res.status(201).send(newAlumni._id)
      }
    })
  }
});

router.get('/:id', function (req, res, next) {
  alumni.findById(req.params.id)
  .populate({ path: 'classes', populate: { path: 'languages' } })
  .lean()
  .exec((err, alum) => {
    console.log(alum);
    if (err) {
      console.error("couldnt get alumn", err)
      res.status(404).send("Couln't find a Bio for that Alumnus");
    } else {
      res.json(modifyAlumniResponse([alum])[0])
    }
  })
});

router.put('/', function (req, res, next) {
  const record = req.body;
  alumni.findByIdAndUpdate(record._id, record, (err, alum) => {
    if (err) {
      console.error("couldnt get alumni", err)
      res.send('couldnt get alumni');
    } else {
      console.log("success")
      res.json(alum)
    }
  })
});

router.delete('/:id', function (req, res, next) {
  alumni.findByIdAndDelete(req.params.id)
    .then(() => res.sendStatus(204))
    .catch(err => res.status(400).send('Unable to delete.'));
});

module.exports = router;
