const express = require("express");
const cors = require('cors')
const router = express.Router();
const { handleStudentRegister, handleTeacherRegister, handleLogin, handleLogout } = require('../Controller/auth')
const {  authroization } = require('../middlewares/authcounter');
const { handleCreateClass, handleclassListdata, handleDeleteClass, handleEditClass } = require("../Controller/class");
const { handleProfile } = require('../Controller/profile');
const { handleStudentList, handleaddStudent, handleaddStudentToList, handleRemoveStudent } = require("../Controller/student");
const { handleclassListToStudent, handleViewAttendance ,handleClasslistOfStudent} = require("../Controller/StudentView");
const {  handleGenerateAttendance, handleMarkAttendence } = require("../Controller/Attendence.controller");
const { handleTeacherViewAttendence,handleGetTeacherAttendenceRecord,handleTeacherOverview} = require("../Controller/Teacher.controller");
const {handleshowbooks,handleRecommendbooks} = require("../Controller/Library.Controller");
const { handleCodeList, handleAddCode } = require("../Controller/code.controller");
router.use(
    cors({
        credentials: true,
        origin: 'http://localhost:5173'
    })
)

router.post('/StudentRegister', handleStudentRegister)
router.post('/login', handleLogin)
router.post('/logout',handleLogout)
router.post('/TeacherRegister', handleTeacherRegister)
router.get('/profile', authroization(['teacher', 'student']), handleProfile)

router.post('/class', authroization(['teacher']), handleCreateClass)
router.post('/deleteClass', authroization(['teacher']), handleDeleteClass)
router.post('/editClass', authroization(['teacher']), handleEditClass)
router.get('/classList', authroization(['teacher']), handleclassListdata)

router.post('/addStudent', authroization(['teacher']), handleaddStudent)
router.post('/removeStudent', authroization(['teacher']), handleRemoveStudent)
router.post('/studentList', authroization(['teacher']), handleStudentList)
router.post('/addStudentToList', authroization(['teacher']), handleaddStudentToList)
    
router.get('/studentClassList', authroization(['student', 'teacher']), handleclassListToStudent)

router.post('/generateAttendence',authroization(['teacher']),handleGenerateAttendance)
router.post('/markAttendence',authroization(['student']),handleMarkAttendence)
router.post('/viewAttendence',authroization(['student']),handleViewAttendance)

router.post('/TeacherViewAttendence',authroization(['teacher']),handleTeacherViewAttendence)

router.post('/attendenceRecord',authroization(['teacher']), handleGetTeacherAttendenceRecord)

router.get('/percent',authroization(['student']),handleClasslistOfStudent)
router.get('/percentteach',authroization(['teacher']),handleTeacherOverview)

router.get('/books', authroization(['student', 'teacher']),handleshowbooks)
router.get('/recommendbooks', authroization(['student', 'teacher']),handleRecommendbooks)

router.get('/codeList', authroization([ 'teacher']),handleCodeList)
router.post('/addcode', authroization([ 'teacher']),handleAddCode)

module.exports = router       
