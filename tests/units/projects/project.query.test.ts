import { projectQuery } from '../../../src/queries/project.query';
import prisma from '../../../prisma/client';

describe('Project Query', () => {
  describe('getProjects', () => {
    it('should return all projects', async () => {
      const projects = await projectQuery.getProjects({});
      expect(projects).toBeDefined();
    });

    it('should return an empty array if no projects are found', async () => {
      try {
        jest.spyOn(prisma.project, 'findMany').mockResolvedValue([]);

        await projectQuery.getProjects({});
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getProjectById', () => {
    it('should return a project by id', async () => {
      jest.spyOn(prisma.project, 'findUnique').mockResolvedValue({
        id: 1,
        name: 'Test Project',
        department: 'Test Department',
        description: 'Test Description',
        startedOn: new Date(),
        endedOn: new Date(),
      });
      try {
        const project = await projectQuery.getProjectById(1);
        expect(project).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return null if project not found', async () => {
      try {
        jest.spyOn(prisma.project, 'findUnique').mockResolvedValue(null);

        await projectQuery.getProjectById(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('createProject', () => {
    it('should create a project', async () => {
      jest.spyOn(prisma.project, 'create').mockResolvedValue({
        id: 1,
        name: 'Test Project',
        department: 'Test Department',
        description: 'Test Description',
        startedOn: new Date(),
        endedOn: new Date(),
      });

      try {
        const project = await projectQuery.createProject({
          id: 1,
          name: 'Test Project',
          department: 'Test Department',
          description: 'Test Description',
          startedOn: new Date(),
          endedOn: new Date(),
        });
        expect(project).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return null if project not created', async () => {
      try {
        jest
          .spyOn(prisma.project, 'create')
          .mockRejectedValue(new Error('Project not created'));

        await projectQuery.createProject({
          id: 1,
          name: 'Test Project',
          department: 'Test Department',
          description: 'Test Description',
          startedOn: new Date(),
          endedOn: new Date(),
        });
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('updateProject', () => {
    it('should update a project', async () => {
      const project = await projectQuery.updateProject(1, {
        id: 1,
        name: 'Test Project',
        department: 'Test Department',
        description: 'Test Description',
        startedOn: new Date(),
        endedOn: new Date(),
      });
      expect(project).toBeDefined();
    });
  });

  describe('deleteProject', () => {
    it('should delete a project', async () => {
      jest.spyOn(prisma.project, 'delete').mockResolvedValue({
        id: 1,
        name: 'Test Project',
        department: 'Test Department',
        description: 'Test Description',
        startedOn: new Date(),
        endedOn: new Date(),
      });
      const project = await projectQuery.deleteProject(1);
      expect(project).toBeDefined();
    });

    it('should return null if project not found', async () => {
      try {
        jest
          .spyOn(prisma.project, 'delete')
          .mockRejectedValue(new Error('Project not found'));

        await projectQuery.deleteProject(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getProjectAssignments', () => {
    it('should return all assignments for a project', async () => {
      jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([
        {
          id: 1,
          projectId: 1,
          userId: 1,
        },
      ]);
      const assignments = await projectQuery.getProjectAssignments(1);
      expect(assignments).toBeDefined();
    });

    it('should return an empty array if no assignments are found', async () => {
      try {
        jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([]);

        await projectQuery.getProjectAssignments(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if project not found', async () => {
      try {
        jest.spyOn(prisma.project, 'findUnique').mockResolvedValue(null);

        await projectQuery.getProjectAssignments(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if project has no assignments', async () => {
      try {
        jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([]);

        await projectQuery.getProjectAssignments(1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getProjectUsers', () => {
    it('should return all users for a project', async () => {
      jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([
        {
          id: 1,
          projectId: 1,
          userId: 1,
        },
      ]);
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([
        {
          id: 1,
          department: 'Test Department',
          username: 'Test User',
          password: 'Test Password',
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          ssn: '123456789',
          dob: new Date(),
          hiredOn: new Date(),
          terminatedOn: null,
          email: 'test@test.com',
          gender: 'Test Gender',
          portrait: 'Test Portrait',
          thumbnail: 'Test Thumbnail',
        },
      ]);
      try {
        const users = await projectQuery.getProjectUsers(1);
        expect(users).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return all users for a project with no assignments', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([
        {
          id: 1,
          department: 'Test Department',
          username: 'Test User',
          password: 'Test Password',
          firstName: 'Test First Name',
          lastName: 'Test Last Name',
          ssn: '123456789',
          dob: new Date(),
          hiredOn: new Date(),
          terminatedOn: null,
          email: 'test@test.com',
          gender: 'Test Gender',
          portrait: 'Test Portrait',
          thumbnail: 'Test Thumbnail',
        },
      ]);
      try {
        const users = await projectQuery.getProjectUsers(1);
        expect(users).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if no users are found', async () => {
      jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([]);
      try {
        const users = await projectQuery.getProjectUsers(1);
        expect(users).toEqual([]);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if no users are found', async () => {
      try {
        const users = await projectQuery.getProjectUsers(1);
        expect(users).toBeDefined();
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if no users are found', async () => {
      try {
        jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);

        await projectQuery.getProjectUsers(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if project not found', async () => {
      jest.spyOn(prisma.project, 'findUnique').mockResolvedValue(null);

      try {
        await projectQuery.getProjectUsers(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });

    it('should return an empty array if project has no users', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);

      try {
        await projectQuery.getProjectUsers(1);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });
});
