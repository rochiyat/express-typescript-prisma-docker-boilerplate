import { Request, Response } from 'express';
import { userQuery } from '../queries/user.query';
import { returnSuccess, returnNonSuccess } from '../utils/helper.util';
import { projectQuery } from '../queries/project.query';

export async function getUsers(req: Request, res: Response) {
  try {
    const users = await userQuery.getUsers();
    returnSuccess(req, res, 200, 'Success to get users', users);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const user = await userQuery.getUserById(Number(req.params.id));
    if (!user) {
      returnNonSuccess(req, res, 404, 'User not found');
    } else {
      returnSuccess(req, res, 200, 'Success to get user', user);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const user = await userQuery.createUser(req.body);
    returnSuccess(req, res, 200, 'Success to create user', user);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    // get user by id
    const user = await userQuery.getUserById(Number(req.params.id));

    if (!user) {
      returnNonSuccess(req, res, 404, 'User not found');
    } else {
      // update user
      const updatedUser = await userQuery.updateUser(
        Number(req.params.id),
        req.body
      );
      returnSuccess(req, res, 200, 'Success to update user', updatedUser);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    // get user by id
    const user = await userQuery.getUserById(Number(req.params.id));

    if (!user) {
      returnNonSuccess(req, res, 404, 'User not found');
    } else {
      // delete user
      const deletedUser = await userQuery.deleteUser(Number(req.params.id));
      returnSuccess(req, res, 200, 'Success to delete user', deletedUser);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getUserProjects(req: Request, res: Response) {
  let projectIds: number[] = [];
  try {
    const projects = await userQuery.getUserProjects(Number(req.params.id));
    if (projects.length === 0) {
      returnNonSuccess(req, res, 404, 'User has no projects');
    } else {
      projectIds = projects.map((project: { projectId: number }) =>
        Number(project.projectId)
      );
      const projectsWithDetails = await projectQuery.getProjects({
        where: {
          id: {
            in: projectIds,
          },
        },
      });
      returnSuccess(
        req,
        res,
        200,
        'Success to get user projects',
        projectsWithDetails
      );
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getUserRoles(req: Request, res: Response) {
  try {
    const roles = await userQuery.getUserRoles(Number(req.params.id));
    returnSuccess(req, res, 200, 'Success to get user roles', roles);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getUserPhones(req: Request, res: Response) {
  try {
    const phones = await userQuery.getUserPhones(Number(req.params.id));
    returnSuccess(req, res, 200, 'Success to get user phones', phones);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getUserAddresses(req: Request, res: Response) {
  try {
    const addresses = await userQuery.getUserAddresses(Number(req.params.id));
    returnSuccess(req, res, 200, 'Success to get user addresses', addresses);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}
