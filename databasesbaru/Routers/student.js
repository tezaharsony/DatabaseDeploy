const express = require('express');
const router = express.Router();
const model = require('../models')


router.get("/", function(req,res){
  model.Student.findAll().then(student =>{
    res.render('student', {dataStudent:student})
    // res.send('ok')
  })
})

router.get('/add', function(req, res){
  res.render('studentAdd');
});

//add new student req.body
router.post('/add', function(req, res){
  model.Student.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email})
  .then( function(){
    res.redirect('/student');
  })
});

//go to the student edit form
router.get('/addsubject/:id', function(req, res){
  model.Student.findById(req.params.id)
  .then (function (rows){
    model.Subject.findAll()
    .then (function (rows2){
    res.render('studentAddSub', {data_student: rows, data_subject: rows2});
  })
   })
 });

router.post('/addsubject/:id', function(req, res) {
  model.studentsubject.create({ studentid: req.params.id, subjectid: req.body.subjectid})
  .then( function(){
  res.redirect('/student');
  })
});


//go to the student edit form
router.get('/edit/:id', function(req, res){
  model.Student.findById(req.params.id)
  .then (function (rows){
    res.render('studentEdit', {data_student: rows});
  })
   });

router.post('/edit/:id', function(req, res) {
  model.Student.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email},
    {
      where: {id: req.params.id}
    }
  )
  .then( function(){
  res.redirect('/student');
  })
});

//delete data from student
router.get('/delete/:id', function(req, res){
    model.Student.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/student');
  })
});

module.exports = router;
