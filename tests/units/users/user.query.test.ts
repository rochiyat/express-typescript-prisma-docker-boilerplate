// tests for user query
import moment from 'moment';
import { userQuery } from '../../../src/queries/user.query';
import prisma from '../../../prisma/client';

describe('userQuery', () => {
  describe('getUserById', () => {
    it('should return a user', async () => {
      const user = await userQuery.getUserById(1);
      expect(user).toBeDefined();
    });

    it('should return null if user not found', async () => {
      const user = await userQuery.getUserById(999);
      expect(user).toBeNull();
    });
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const users = await userQuery.getUsers();
      expect(users).toBeDefined();
    });

    it('should return an empty array if no users are found', async () => {
      jest.spyOn(prisma.user, 'findMany').mockResolvedValue([]);

      const users = await userQuery.getUsers();
      expect(users).toEqual([]);
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      const user = await userQuery.createUser({
        id: 1,
        username: 'john_doe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        ssn: '123-45-6789',
        dob: moment('1990-01-01T00:00:00.000Z').toDate(),
        hiredOn: moment('2021-01-01T00:00:00.000Z').toDate(),
        terminatedOn: moment('2021-01-01T00:00:00.000Z').toDate(),
        email: 'user@example.com',
        department: 'Sales',
        gender: 'Male',
        portrait: 'https://example.com/portrait.jpg',
        thumbnail: 'https://example.com/thumbnail.jpg',
      });
      expect(user).toBeDefined();
    });
  });

  describe('updateUser', () => {
    it('should update a user', async () => {
      const user = await userQuery.updateUser(1, {
        id: 1,
        username: 'john_doe',
        password: 'password123',
        firstName: 'John',
        lastName: 'Doe',
        ssn: '123-45-6789',
        dob: moment('1990-01-01T00:00:00.000Z').toDate(),
        hiredOn: moment('2021-01-01T00:00:00.000Z').toDate(),
        terminatedOn: moment('2021-01-01T00:00:00.000Z').toDate(),
        email: 'user@example.com',
        department: 'Sales',
        gender: 'Male',
        portrait: 'https://example.com/portrait.jpg',
        thumbnail: 'https://example.com/thumbnail.jpg',
      });
      expect(user).toBeDefined();
    });
  });

  describe('deleteUser', () => {
    it('should delete a user', async () => {
      const user = await userQuery.deleteUser(1);
      expect(user).toBeDefined();
    });

    it('should return null if user not found', async () => {
      try {
        jest
          .spyOn(prisma.user, 'delete')
          .mockRejectedValue(new Error('User not found'));
        await userQuery.deleteUser(999);
      } catch (error) {
        expect(error).toBeDefined();
      }
    });
  });

  describe('getUserProjects', () => {
    it('should return all projects for a user', async () => {
      const projects = await userQuery.getUserProjects(1);
      expect(projects).toBeDefined();
    });

    it('should return an empty array if no projects are found', async () => {
      jest.spyOn(prisma.projectAssignment, 'findMany').mockResolvedValue([]);

      const projects = await userQuery.getUserProjects(1);
      expect(projects).toEqual([]);
    });
  });

  describe('getUserRoles', () => {
    it('should return all roles for a user', async () => {
      const roles = await userQuery.getUserRoles(1);
      expect(roles).toBeDefined();
    });

    it('should return an empty array if no roles are found', async () => {
      jest.spyOn(prisma.userRole, 'findMany').mockResolvedValue([]);

      const roles = await userQuery.getUserRoles(1);
      expect(roles).toEqual([]);
    });
  });

  describe('getUserPhones', () => {
    it('should return all phones for a user', async () => {
      const phones = await userQuery.getUserPhones(1);
      expect(phones).toBeDefined();
    });

    it('should return an empty array if no phones are found', async () => {
      jest.spyOn(prisma.userPhone, 'findMany').mockResolvedValue([]);

      const phones = await userQuery.getUserPhones(1);
      expect(phones).toEqual([]);
    });
  });

  describe('getUserAddresses', () => {
    it('should return all addresses for a user', async () => {
      const addresses = await userQuery.getUserAddresses(1);
      expect(addresses).toBeDefined();
    });

    it('should return an empty array if no addresses are found', async () => {
      jest.spyOn(prisma.userAddress, 'findMany').mockResolvedValue([]);

      const addresses = await userQuery.getUserAddresses(1);
      expect(addresses).toEqual([]);
    });
  });
});
