'use strict';
module.exports = function(sequelize, DataTypes) {
  var studentsubject = sequelize.define('studentsubject', {
    SubjectId: DataTypes.INTEGER,
    StudentId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  });
   studentsubject.associate =(models) => {
   studentsubject.belongsTo(models.Student);
   studentsubject.belongsTo(models.Subject);
}
  return studentsubject;
};
