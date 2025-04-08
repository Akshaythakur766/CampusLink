import express from "express";
import cors from "cors";
import {
  handleAddCode,
  handleaddStudent,
  handleaddStudentToList,
  handleAskedBooks,
  handleAskRequest,
  handleChangeAvailable,
  handleclassListdata,
  handleClasslistOfStudent,
  handleclassListToStudent,
  handleCodeList,
  handleCreateClass,
  handleDeleteClass,
  handleEditClass,
  handleGenerateAttendance,
  handleGetTeacherAttendenceRecord,
  handleLogin,
  handleLogout,
  handleMarkAttendence,
  handleProfile,
  handleRecommendbooks,
  handleRemoveStudent,
  handleReqList,
  handleshowbooks,
  handleStudentList,
  handleStudentRegister,
  handleTeacherList,
  handleTeacherOverview,
  handleTeacherRegister,
  handleTeacherViewAttendence,
  handleViewAttendance,
} from "@CampusLink/Server/Controller";
import { authroization } from "@CampusLink/Server/MiddleWares";

const router = express.Router();

const allowedOrigins: string[] = [
  "http://localhost:5173",
  "http://localhost:3000",
  "http://192.168.29.231:3000",
];

const corsOptions: cors.CorsOptions = {
  credentials: true,
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};
router.use(cors(corsOptions));

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

export  {router};
