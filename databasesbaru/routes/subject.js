const express = require('express');
const router = express.Router();
const model = require('../models')
const convertScore = require('../helpers/convertScore')

router.get('/', function(req, res){
  model.Subject.findAll()
  .then (arrSubject => {
    let promiseSubject = arrSubject.map( subject => {
      return new Promise( function (resolve, reject) {
        subject.getTeachers()
        .then( teacher => {
          subject.first_name =[];
          teacher.forEach(teacher => {
            subject.first_name.push(teacher.dataValues.first_name+' '+teacher.dataValues.last_name)
          })
          return resolve(subject);
        })
        .catch(err => reject (err));
      });
    });
    Promise.all(promiseSubject)
    .then( subject => {
      console.log(subject);
      res.render('subject', {dataSubject: subject});
    })
    .catch(err => {
      console.log(err);
    })
  })

  router.get('/enrolledStudent/:id', function(req, res){
  model.studentsubject.findAll({
    where: {
      SubjectId: req.params.id
    },
    include: [{all:true}]
  })
  .then(function (rows){
    console.log(JSON.stringify(rows));
    res.render('enrolledStudent', {student_subject:rows})
  })
});

// router.get('/enrolledStudent/:id', (req, res) => {
//   let id = req.params.id
//   model.Subject.findOne({
//     where : { id : id }
//   })
//   .then(subject => {
//   model.studentsubject.findAll({
//     where : {
//       SubjectId : id
//   }, include : [model.Student],
//     order : [['Student', 'first_name', 'ASC']]
//   })
//   .then(student_subject => {
//
//     //let giveScore = convertScore(student_subject)
//     console.log(student_subject[0]);
//     res.render('enrolledStudent', {subject : subject, student_subject : student_subject, scoreLetter : ""})
//   })
//   })
// })

});
module.exports = router;
