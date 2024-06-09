const ClassModel = require('../model/Class');
const LibModel =require('../model/Library.Model')
const UserModel = require('../model/auth')
// const Teacher = require("../model/teacherauth");
const StudentClasses = require('../model/studentVew.model');


async function handleshowbooks(req,res){
    
    try {
      const response= await LibModel.find({})
      res.json(response)
    } catch (error) {
      console.log(error)
    }
}
async function handleRecommendbooks(req, res) {
  const role = req.user.role;
  const userId = req.user.id;

  try {
      if (role == 'student') {
          const user = await UserModel.findById(userId); 
          const course =[ user.course]; 
          const subjects = await StudentClasses.find({ student: userId }).populate({
              path: 'classes.class',
              select: 'subj' // Exclude the _id field
          });

          const uniqueSubjects = new Set();
          subjects.forEach(subject => {
              subject.classes.forEach(clas => {
                  uniqueSubjects.add(clas.class.subj);
              });
          });
          course.push('G.K','Literature')
          res.json({subject:[...uniqueSubjects],course:course});
      } else if (role == 'teacher') {
          const subjects = await ClassModel.find({teacher_id:userId})
          const subject=[]
          const course=[]

        subjects.forEach(sub=>{
            subject.push(sub.subj)
            course.push(sub.course)
            course.push('G.K','Literature')
        })
        res.json({subject:subject,course:course})
      } else {
          res.status(400).json({ message: 'Invalid role' });
      }
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error fetching subjects' });
  }
}

module.exports={handleshowbooks,handleRecommendbooks}