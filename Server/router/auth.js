const express = require("express");
const cors = require("cors");
const router = express.Router();
const {
  handleStudentRegister,
  handleTeacherRegister,
  handleLogin,
  handleLogout,
} = require("../Controller/auth.controller");
const { authroization } = require("../middlewares/authcounter");
const {
  handleCreateClass,
  handleclassListdata,
  handleDeleteClass,
  handleEditClass,
} = require("../Controller/class.controller");
const { handleProfile } = require("../Controller/profile.controller");
const {
  handleStudentList,
  handleaddStudent,
  handleaddStudentToList,
  handleRemoveStudent,
} = require("../Controller/student.controller");
const {
  handleclassListToStudent,
  handleViewAttendance,
  handleClasslistOfStudent,
} = require("../Controller/StudentView.controller");
const {
  handleGenerateAttendance,
  handleMarkAttendence,
} = require("../Controller/Attendence.controller");
const {
  handleTeacherViewAttendence,
  handleGetTeacherAttendenceRecord,
  handleTeacherOverview,
} = require("../Controller/Teacher.controller");
const {
  handleshowbooks,
  handleRecommendbooks,
  handleAskRequest,
  handleReqList,
  handleAskedBooks,
  handleChangeAvailable,
} = require("../Controller/Library.Controller");
const {
  handleCodeList,
  handleAddCode,
  handleTeacherList,
} = require("../Controller/code.controller");
const allowedOrigins = [
  "http://localhost:5173", 
  "http://localhost:3000", 
];

router.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);


router.post("/StudentRegister", handleStudentRegister);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);
router.post("/TeacherRegister", handleTeacherRegister);
router.get(
  "/profile",
  authroization(["teacher", "student", "staff", "librarian"]),
  handleProfile
);

router.post("/class", authroization(["teacher"]), handleCreateClass);
router.post("/deleteClass", authroization(["teacher"]), handleDeleteClass);
router.post("/editClass", authroization(["teacher"]), handleEditClass);
router.get("/classList", authroization(["teacher"]), handleclassListdata);

router.post("/addStudent", authroization(["teacher"]), handleaddStudent);
router.post("/removeStudent", authroization(["teacher"]), handleRemoveStudent);
router.post("/studentList", authroization(["teacher"]), handleStudentList);
router.post(
  "/addStudentToList",
  authroization(["teacher"]),
  handleaddStudentToList
);

router.get(
  "/studentClassList",
  authroization(["student", "teacher"]),
  handleclassListToStudent
);

router.post(
  "/generateAttendence",
  authroization(["teacher"]),
  handleGenerateAttendance
);
router.post(
  "/markAttendence",
  authroization(["student"]),
  handleMarkAttendence
);
router.post(
  "/viewAttendence",
  authroization(["student"]),
  handleViewAttendance
);

router.post(
  "/TeacherViewAttendence",
  authroization(["teacher"]),
  handleTeacherViewAttendence
);

router.post(
  "/attendenceRecord",
  authroization(["teacher"]),
  handleGetTeacherAttendenceRecord
);

router.get("/percent", authroization(["student"]), handleClasslistOfStudent);
router.get("/percentteach", authroization(["teacher"]), handleTeacherOverview);

router.get(
  "/books",
  authroization(["student", "teacher", "staff", "librarian"]),
  handleshowbooks
);
router.get(
  "/recommendbooks",
  authroization(["student", "teacher", "staff", "librarian"]),
  handleRecommendbooks
);

router.get("/codeList", authroization(["staff"]), handleCodeList);
router.post("/addcode", authroization(["staff"]), handleAddCode);

router.post(
  "/askBook",
  authroization(["student", "teacher", "staff"]),
  handleAskRequest
);
router.post(
  "/changeAvailable",
  authroization(["librarian"]),
  handleChangeAvailable
);

router.get("/reqlist", authroization(["librarian"]), handleReqList);
router.get(
  "/askedbooks",
  authroization(["student", "teacher", "staff"]),
  handleAskedBooks
);
router.get("/teacherList", authroization(["staff"]), handleTeacherList);

module.exports = router;
