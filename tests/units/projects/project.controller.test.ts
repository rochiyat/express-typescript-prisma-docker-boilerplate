import {
  getProjectById,
  getProjects,
  createProject,
  updateProject,
  deleteProject,
  getProjectUsers,
  getProjectAssignments,
} from '../../../src/controllers/project.controller';
import { projectQuery } from '../../../src/queries/project.query';
import {
  returnSuccess,
  returnNonSuccess,
} from '../../../src/utils/helper.util';

jest.mock('../../../src/queries/project.query', () => ({
  projectQuery: {
    getProjects: jest.fn(),
    getProjectById: jest.fn(),
    createProject: jest.fn(),
    updateProject: jest.fn(),
    deleteProject: jest.fn(),
    getProjectUsers: jest.fn(),
    getProjectAssignments: jest.fn(),
  },
}));

jest.mock('../../../src/utils/helper.util', () => ({
  returnSuccess: jest.fn(),
  returnNonSuccess: jest.fn(),
}));

describe('Project Controller', () => {
  describe('getProjects', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = {};
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      jest.clearAllMocks();
    });

    it('should return projects successfully', async () => {
      const mockProjects = [{ id: 1, name: 'Project 1' }];
      (projectQuery.getProjects as jest.Mock).mockResolvedValue(mockProjects);

      await getProjects(req, res);

      expect(projectQuery.getProjects).toHaveBeenCalledWith({});
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get projects',
        mockProjects
      );
    });

    it('should handle errors properly', async () => {
      try {
        (projectQuery.getProjects as jest.Mock).mockRejectedValue(
          new Error('Database error')
        );

        await getProjects(req, res);

        expect(returnNonSuccess).toHaveBeenCalledWith(
          req,
          res,
          500,
          'Internal Server Error'
        );
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getProjectById', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return project by id', async () => {
      const mockProject = { id: 1, name: 'Project 1' };
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(mockProject);

      await getProjectById(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get project',
        mockProject
      );
    });

    it('should return 404 if project not found', async () => {
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(null);

      await getProjectById(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'Project not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.getProjectById as jest.Mock).mockRejectedValue(mockError);

      await getProjectById(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('createProject ', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = {
        body: {
          name: 'Project 1',
          department: 'Sales',
          startedOn: '2021-01-01T00:00:00.000Z',
          endedOn: '2021-01-01T00:00:00.000Z',
          description: 'Project 1 description',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should create a new project and return success response', async () => {
      const mockProject = { id: 1, ...req.body };
      (projectQuery.createProject as jest.Mock).mockResolvedValue(mockProject);

      await createProject(req, res);

      expect(projectQuery.createProject).toHaveBeenCalledWith(req.body);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Project created successfully',
        mockProject
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.createProject as jest.Mock).mockRejectedValue(mockError);

      await createProject(req, res);

      expect(projectQuery.createProject).toHaveBeenCalledWith(req.body);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('updateProject', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 }, body: { name: 'Project 1' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return update project by id', async () => {
      const mockProject = { id: 1, name: 'Project 1' };
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(mockProject);
      (projectQuery.updateProject as jest.Mock).mockResolvedValue(mockProject);
      await updateProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Project updated successfully',
        mockProject
      );
    });

    it('should return 404 if project not found', async () => {
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(null);

      await updateProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'Project not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.getProjectById as jest.Mock).mockRejectedValue(mockError);
      (projectQuery.updateProject as jest.Mock).mockRejectedValue(mockError);
      await updateProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('deleteProject', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return delete project by id', async () => {
      const mockProject = { id: 1, name: 'Project 1' };
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(mockProject);
      (projectQuery.deleteProject as jest.Mock).mockResolvedValue(mockProject);
      await deleteProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(projectQuery.deleteProject).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Project deleted successfully',
        mockProject
      );
    });

    it('should return 404 if project not found', async () => {
      (projectQuery.getProjectById as jest.Mock).mockResolvedValue(null);

      await deleteProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'Project not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.getProjectById as jest.Mock).mockRejectedValue(mockError);
      (projectQuery.deleteProject as jest.Mock).mockRejectedValue(mockError);
      await deleteProject(req, res);

      expect(projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getProjectAssignments', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return user projects', async () => {
      const mockProjects = [{ id: 1, name: 'Project 1' }];
      (projectQuery.getProjectAssignments as jest.Mock).mockResolvedValue(
        mockProjects
      );

      await getProjectAssignments(req, res);

      expect(projectQuery.getProjectAssignments).toHaveBeenCalledWith(
        req.params.id
      );
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get project assignments',
        mockProjects
      );
    });

    it('should return 404 if project not found', async () => {
      (projectQuery.getProjectAssignments as jest.Mock).mockResolvedValue([]);

      await getProjectAssignments(req, res);

      expect(projectQuery.getProjectAssignments).toHaveBeenCalledWith(
        req.params.id
      );
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'Project has no assignments'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.getProjectAssignments as jest.Mock).mockRejectedValue(
        mockError
      );
      await getProjectAssignments(req, res);

      expect(projectQuery.getProjectAssignments).toHaveBeenCalledWith(
        req.params.id
      );
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getProjectUsers', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return project users', async () => {
      const mockProjects = [{ id: 1, name: 'Project 1' }];
      (projectQuery.getProjectUsers as jest.Mock).mockResolvedValue(
        mockProjects
      );
      (projectQuery.getProjects as jest.Mock).mockResolvedValue(mockProjects);

      await getProjectUsers(req, res);

      expect(projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get project users',
        mockProjects
      );
    });

    it('should return 404 if project not found', async () => {
      (projectQuery.getProjectUsers as jest.Mock).mockResolvedValue([]);

      await getProjectUsers(req, res);

      expect(projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'Project has no users'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (projectQuery.getProjectUsers as jest.Mock).mockRejectedValue(mockError);
      await getProjectUsers(req, res);

      expect(projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });
});
