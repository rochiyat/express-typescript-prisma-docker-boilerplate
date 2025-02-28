import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  getUserProjects,
  getUserRoles,
  getUserPhones,
  getUserAddresses,
} from '../../../src/controllers/user.controller';
import { projectQuery } from '../../../src/queries/project.query';
import { userQuery } from '../../../src/queries/user.query';
import {
  returnSuccess,
  returnNonSuccess,
} from '../../../src/utils/helper.util';

jest.mock('../../../src/queries/user.query', () => ({
  userQuery: {
    createUser: jest.fn(),
    getUsers: jest.fn(),
    getUserById: jest.fn(),
    deleteUser: jest.fn(),
    updateUser: jest.fn(),
    getUserProjects: jest.fn(),
    getUserRoles: jest.fn(),
    getUserPhones: jest.fn(),
    getUserAddresses: jest.fn(),
  },
}));

jest.mock('../../../src/queries/project.query', () => ({
  projectQuery: {
    getProjects: jest.fn(),
  },
}));

jest.mock('../../../src/utils/helper.util', () => ({
  returnSuccess: jest.fn(),
  returnNonSuccess: jest.fn(),
}));

describe('User Controller', () => {
  describe('createUser ', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = {
        body: {
          username: 'john_doe',
          password: 'password123',
          firstName: 'John',
          lastName: 'Doe',
          ssn: '123-45-6789',
          dob: '1990-01-01T00:00:00.000Z',
          hiredOn: '2021-01-01T00:00:00.000Z',
          terminatedOn: '2021-01-01T00:00:00.000Z',
          email: 'user@example.com',
          department: 'Sales',
          gender: 'Male',
          portrait: 'https://example.com/portrait.jpg',
          thumbnail: 'https://example.com/thumbnail.jpg',
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should create a new user and return success response', async () => {
      const mockUser = { id: 1, ...req.body };
      (userQuery.createUser as jest.Mock).mockResolvedValue(mockUser);

      await createUser(req, res);

      expect(userQuery.createUser).toHaveBeenCalledWith(req.body);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to create user',
        mockUser
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.createUser as jest.Mock).mockRejectedValue(mockError);

      await createUser(req, res);

      expect(userQuery.createUser).toHaveBeenCalledWith(req.body);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUsers', () => {
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

    it('should return users with pagination', async () => {
      const mockUsers = [
        { id: 1, username: 'user1' },
        { id: 2, username: 'user2' },
      ];
      (userQuery.getUsers as jest.Mock).mockResolvedValue(mockUsers);

      await getUsers(req, res);

      expect(userQuery.getUsers).toHaveBeenCalled();
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get users',
        mockUsers
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUsers as jest.Mock).mockRejectedValue(mockError);

      await getUsers(req, res);

      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUser', () => {
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

    it('should return user by id', async () => {
      const mockUser = { id: 1, username: 'user1' };
      (userQuery.getUserById as jest.Mock).mockResolvedValue(mockUser);

      await getUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get user',
        mockUser
      );
    });

    it('should return 404 if user not found', async () => {
      (userQuery.getUserById as jest.Mock).mockResolvedValue(null);

      await getUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'User not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserById as jest.Mock).mockRejectedValue(mockError);

      await getUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('deleteUser', () => {
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

    it('should return delete user by id', async () => {
      const mockUser = { id: 1, username: 'user1' };
      (userQuery.getUserById as jest.Mock).mockResolvedValue(mockUser);
      (userQuery.deleteUser as jest.Mock).mockResolvedValue(mockUser);
      await deleteUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to delete user',
        mockUser
      );
    });

    it('should return 404 if user not found', async () => {
      (userQuery.getUserById as jest.Mock).mockResolvedValue(null);

      await deleteUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'User not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserById as jest.Mock).mockRejectedValue(mockError);
      (userQuery.deleteUser as jest.Mock).mockRejectedValue(mockError);
      await deleteUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('updateUser', () => {
    let req: any;
    let res: any;

    beforeEach(() => {
      req = { params: { id: 1 }, body: { username: 'user1' } };
      res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      jest.clearAllMocks();
    });

    it('should return update user by id', async () => {
      const mockUser = { id: 1, username: 'user1' };
      (userQuery.getUserById as jest.Mock).mockResolvedValue(mockUser);
      (userQuery.updateUser as jest.Mock).mockResolvedValue(mockUser);
      await updateUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to update user',
        mockUser
      );
    });

    it('should return 404 if user not found', async () => {
      (userQuery.getUserById as jest.Mock).mockResolvedValue(null);

      await updateUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'User not found'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserById as jest.Mock).mockRejectedValue(mockError);
      (userQuery.updateUser as jest.Mock).mockRejectedValue(mockError);
      await updateUser(req, res);

      expect(userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUserProjects', () => {
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
      (userQuery.getUserProjects as jest.Mock).mockResolvedValue(mockProjects);
      (projectQuery.getProjects as jest.Mock).mockResolvedValue(mockProjects);

      await getUserProjects(req, res);

      expect(userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get user projects',
        mockProjects
      );
    });

    it('should return 404 if user not found', async () => {
      (userQuery.getUserProjects as jest.Mock).mockResolvedValue([]);

      await getUserProjects(req, res);

      expect(userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        404,
        'User has no projects'
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserProjects as jest.Mock).mockRejectedValue(mockError);
      await getUserProjects(req, res);

      expect(userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUserRoles', () => {
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

    it('should return user roles', async () => {
      const mockRoles = [{ id: 1, name: 'Role 1' }];
      (userQuery.getUserRoles as jest.Mock).mockResolvedValue(mockRoles);

      await getUserRoles(req, res);

      expect(userQuery.getUserRoles).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get user roles',
        mockRoles
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserRoles as jest.Mock).mockRejectedValue(mockError);
      await getUserRoles(req, res);

      expect(userQuery.getUserRoles).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUserPhones', () => {
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

    it('should return user phones', async () => {
      const mockPhones = [{ id: 1, number: '123-456-7890' }];
      (userQuery.getUserPhones as jest.Mock).mockResolvedValue(mockPhones);

      await getUserPhones(req, res);

      expect(userQuery.getUserPhones).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get user phones',
        mockPhones
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserPhones as jest.Mock).mockRejectedValue(mockError);
      await getUserPhones(req, res);

      expect(userQuery.getUserPhones).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });

  describe('getUserAddresses', () => {
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

    it('should return user addresses', async () => {
      const mockAddresses = [{ id: 1, address: '123 Main St' }];
      (userQuery.getUserAddresses as jest.Mock).mockResolvedValue(
        mockAddresses
      );

      await getUserAddresses(req, res);

      expect(userQuery.getUserAddresses).toHaveBeenCalledWith(req.params.id);
      expect(returnSuccess).toHaveBeenCalledWith(
        req,
        res,
        200,
        'Success to get user addresses',
        mockAddresses
      );
    });

    it('should handle errors and return 500 response', async () => {
      const mockError = new Error('Database error');
      (userQuery.getUserAddresses as jest.Mock).mockRejectedValue(mockError);
      await getUserAddresses(req, res);

      expect(userQuery.getUserAddresses).toHaveBeenCalledWith(req.params.id);
      expect(returnNonSuccess).toHaveBeenCalledWith(
        req,
        res,
        500,
        'Internal Server Error'
      );
    });
  });
});
