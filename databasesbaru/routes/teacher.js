const express = require('express');
const router = express.Router();
const model = require('../models')


router.get("/", function(req,res){
  model.Teacher.findAll({
    include:[model.Subject]
  })
  .then(teacher =>{
    console.log(teacher);
    res.render('teacher', {dataTeacher:teacher})
  })
})


router.get('/add', function(req, res){
  res.render('teacherAdd');
});

//add new student req.body
router.post('/add', function(req, res){
  model.Teacher.create({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email})
  .then( function(){
    res.redirect('/teacher');
  })
});

//go to the student edit form
router.get('/edit/:id', function(req, res){
  model.Teacher.findById(req.params.id)
  .then (function (rows){
    model.Subject.findAll()
    .then (function(rowsubject){
      res.render('teacherEdit', {dataTeacher: rows, dataSubject: rowsubject});
      })
    })
   });

router.post('/edit/:id', function(req, res) {
  model.Teacher.update({ first_name: req.body.first_name, last_name: req.body.last_name, email: req.body.email},
    {
      where: {id: req.params.id}
    }
  )
  .then( function(){
  res.redirect('/teacher');
  })
});

//delete data from student
router.get('/delete/:id', function(req, res){
    model.Teacher.destroy({where: {id : req.params.id}})
    .then( function(){
  res.redirect('/teacher');
  })
});


module.exports = router;
