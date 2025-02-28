import { Router } from 'express';
import * as userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id/projects', userController.getUserProjects);
router.get('/:id/roles', userController.getUserRoles);
router.get('/:id/phones', userController.getUserPhones);
router.get('/:id/addresses', userController.getUserAddresses);

export default router;
