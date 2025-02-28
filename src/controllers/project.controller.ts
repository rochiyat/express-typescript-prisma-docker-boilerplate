import { Request, Response } from 'express';
import { isEmpty } from 'lodash';
import { projectQuery } from '../queries/project.query';
import { returnSuccess, returnNonSuccess } from '../utils/helper.util';
export async function getProjects(req: Request, res: Response) {
  try {
    const projects = await projectQuery.getProjects({});
    returnSuccess(req, res, 200, 'Success to get projects', projects);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getProjectById(req: Request, res: Response) {
  try {
    const project = await projectQuery.getProjectById(Number(req.params.id));
    if (isEmpty(project)) {
      returnNonSuccess(req, res, 404, 'Project not found');
    } else {
      returnSuccess(req, res, 200, 'Success to get project', project);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function createProject(req: Request, res: Response) {
  try {
    const project = await projectQuery.createProject(req.body);
    returnSuccess(req, res, 200, 'Project created successfully', project);
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function updateProject(req: Request, res: Response) {
  try {
    const project = await projectQuery.getProjectById(Number(req.params.id));
    if (isEmpty(project)) {
      returnNonSuccess(req, res, 404, 'Project not found');
    } else {
      const updatedProject = await projectQuery.updateProject(
        Number(req.params.id),
        req.body
      );
      returnSuccess(
        req,
        res,
        200,
        'Project updated successfully',
        updatedProject
      );
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function deleteProject(req: Request, res: Response) {
  try {
    const project = await projectQuery.getProjectById(Number(req.params.id));
    if (isEmpty(project)) {
      returnNonSuccess(req, res, 404, 'Project not found');
    } else {
      await projectQuery.deleteProject(Number(req.params.id));
      returnSuccess(req, res, 200, 'Project deleted successfully', project);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getProjectAssignments(req: Request, res: Response) {
  try {
    const assignments = await projectQuery.getProjectAssignments(
      Number(req.params.id)
    );
    if (assignments.length === 0) {
      returnNonSuccess(req, res, 404, 'Project has no assignments');
    } else {
      returnSuccess(
        req,
        res,
        200,
        'Success to get project assignments',
        assignments
      );
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}

export async function getProjectUsers(req: Request, res: Response) {
  try {
    const users = await projectQuery.getProjectUsers(Number(req.params.id));
    if (users.length === 0) {
      returnNonSuccess(req, res, 404, 'Project has no users');
    } else {
      returnSuccess(req, res, 200, 'Success to get project users', users);
    }
  } catch (error) {
    returnNonSuccess(req, res, 500, 'Internal Server Error');
  }
}
