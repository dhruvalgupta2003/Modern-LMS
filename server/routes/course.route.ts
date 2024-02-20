import express from "express";
const courseRouter = express.Router();
import {
    addAnwer,
    addQuestion,
  addReplyToReview,
  addReview,
  deleteCourse,
  editCourse,
  getAllCourse,
  getAllCourses,
  getCourseByUser,
  getSingleCourse,
  uploadCourse,
} from "../controllers/course.controller";
import { authorizeRoles, isAuthenticated } from "../middleware/auth";

courseRouter.post(
  "/create-course",
  isAuthenticated,
  authorizeRoles("admin"),
  uploadCourse
);

courseRouter.put(
  "/edit-course/:id",
  isAuthenticated,
  authorizeRoles("admin"),
  editCourse
);

courseRouter.get(
    "/get-course/:id",
    getSingleCourse
);

courseRouter.get(
    "/get-courses",
    getAllCourses
);

courseRouter.get(
    "/get-course-content/:id",
    isAuthenticated, 
    getCourseByUser
);

courseRouter.put(
    "/add-question",
    isAuthenticated,
    addQuestion,
);

courseRouter.put(
    "/add-answer",
    isAuthenticated,
    addAnwer,
);

courseRouter.put(
  "/add-review/:id",
  isAuthenticated,
  addReview,
);

courseRouter.put(
  "/add-reply",
  isAuthenticated,
  addReplyToReview,
);

courseRouter.get(
  "/get-courses",
  isAuthenticated,
  authorizeRoles("admin"),
  getAllCourse,
);

courseRouter.delete(
  "/delete-course",
  isAuthenticated,
  authorizeRoles("admin"),
  deleteCourse,
)
export default courseRouter;
