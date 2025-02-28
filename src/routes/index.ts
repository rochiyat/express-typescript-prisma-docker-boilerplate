import { Router } from 'express';
import userRoute from './user.route';
import projectRoute from './project.route';

const router = Router();

router.use('/users', userRoute);
router.use('/projects', projectRoute);

export default router;
