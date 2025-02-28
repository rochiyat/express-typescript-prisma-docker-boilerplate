import { isEmpty } from 'lodash';
import prisma from '../../prisma/client';
import { Project } from '../models/project.model';

export class ProjectQuery {
  async getProjects(params: any) {
    const projects = await prisma.project.findMany(params);
    if (projects.length === 0) {
      throw new Error('No projects found');
    } else {
      return projects;
    }
  }

  async getProjectById(id: number) {
    const project = await prisma.project.findUnique({ where: { id } });
    if (!isEmpty(project)) {
      throw new Error('Project not found');
    } else {
      return project;
    }
  }

  async createProject(project: Project) {
    return prisma.project.create({
      data: project,
    });
  }

  async updateProject(id: number, project: Project) {
    return prisma.project.update({
      where: { id },
      data: project,
    });
  }

  async deleteProject(id: number) {
    return prisma.project.delete({ where: { id } });
  }

  async getProjectAssignments(id: number) {
    const assignments = await prisma.projectAssignment.findMany({
      where: { projectId: id },
    });
    if (assignments.length === 0) {
      throw new Error('Project has no assignments');
    } else {
      return assignments;
    }
  }

  async getProjectUsers(id: number) {
    const assignments = await prisma.projectAssignment.findMany({
      where: { projectId: id },
    });
    if (assignments.length === 0) {
      throw new Error('Project has no users');
    } else {
      const users = await prisma.user.findMany({
        where: {
          id: {
            in: assignments.map(
              (assignment: { id: number; projectId: number; userId: number }) =>
                Number(assignment.userId)
            ),
          },
        },
      });
      return users;
    }
  }
}

export const projectQuery = new ProjectQuery();
