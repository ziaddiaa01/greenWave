import { Router } from 'express';
import {
    addCourse,
    updateCourse,
    deleteCourse,
    searchCourse,
    getCourseById,
    getAllCourses
} from './course.controller.js';

const router = Router();

router.post('/course', addCourse);
router.put('/course/:courseId', updateCourse);
router.delete('/course/:courseId', deleteCourse);
router.get('/course/search', searchCourse);
router.get('/getById/:courseId', getCourseById);
router.get('/allCourses', getAllCourses);

export default router;
