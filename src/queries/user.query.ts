import prisma from '../../prisma/client';
import { User } from '../models/user.model';

export class UserQuery {
  async getUsers() {
    return prisma.user.findMany();
  }

  async getUserById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  }

  async createUser(user: User) {
    return prisma.user.create({ data: user });
  }

  async updateUser(id: number, user: User) {
    return prisma.user.update({ where: { id }, data: user });
  }

  async deleteUser(id: number) {
    return prisma.user.delete({ where: { id } });
  }

  async getUserProjects(id: number) {
    return prisma.projectAssignment.findMany({ where: { userId: id } });
  }

  async getUserRoles(id: number) {
    return prisma.userRole.findMany({ where: { userId: id } });
  }

  async getUserPhones(id: number) {
    return prisma.userPhone.findMany({ where: { userId: id } });
  }

  async getUserAddresses(id: number) {
    return prisma.userAddress.findMany({ where: { userId: id } });
  }
}

export const userQuery = new UserQuery();
