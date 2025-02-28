import { Router } from 'express';
import {
  createProject,
  deleteProject,
  getProjectAssignments,
  getProjectById,
  getProjectUsers,
  getProjects,
  updateProject,
} from '../controllers/project.controller';

const router = Router();

router.get('/', getProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);
router.get('/:id/assignments', getProjectAssignments);
router.get('/:id/users', getProjectUsers);

export default router;
