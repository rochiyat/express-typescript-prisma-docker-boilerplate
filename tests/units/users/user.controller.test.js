"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_controller_1 = require("../../../src/controllers/user.controller");
const project_query_1 = require("../../../src/queries/project.query");
const user_query_1 = require("../../../src/queries/user.query");
const helper_util_1 = require("../../../src/utils/helper.util");
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
        let req;
        let res;
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
        it('should create a new user and return success response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = Object.assign({ id: 1 }, req.body);
            user_query_1.userQuery.createUser.mockResolvedValue(mockUser);
            yield (0, user_controller_1.createUser)(req, res);
            expect(user_query_1.userQuery.createUser).toHaveBeenCalledWith(req.body);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to create user', mockUser);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.createUser.mockRejectedValue(mockError);
            yield (0, user_controller_1.createUser)(req, res);
            expect(user_query_1.userQuery.createUser).toHaveBeenCalledWith(req.body);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUsers', () => {
        let req;
        let res;
        beforeEach(() => {
            req = {};
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return users with pagination', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUsers = [
                { id: 1, username: 'user1' },
                { id: 2, username: 'user2' },
            ];
            user_query_1.userQuery.getUsers.mockResolvedValue(mockUsers);
            yield (0, user_controller_1.getUsers)(req, res);
            expect(user_query_1.userQuery.getUsers).toHaveBeenCalled();
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get users', mockUsers);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUsers.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUsers)(req, res);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUser', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1' };
            user_query_1.userQuery.getUserById.mockResolvedValue(mockUser);
            yield (0, user_controller_1.getUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get user', mockUser);
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_query_1.userQuery.getUserById.mockResolvedValue(null);
            yield (0, user_controller_1.getUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'User not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserById.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('deleteUser', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return delete user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1' };
            user_query_1.userQuery.getUserById.mockResolvedValue(mockUser);
            user_query_1.userQuery.deleteUser.mockResolvedValue(mockUser);
            yield (0, user_controller_1.deleteUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to delete user', mockUser);
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_query_1.userQuery.getUserById.mockResolvedValue(null);
            yield (0, user_controller_1.deleteUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'User not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserById.mockRejectedValue(mockError);
            user_query_1.userQuery.deleteUser.mockRejectedValue(mockError);
            yield (0, user_controller_1.deleteUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('updateUser', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 }, body: { username: 'user1' } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return update user by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockUser = { id: 1, username: 'user1' };
            user_query_1.userQuery.getUserById.mockResolvedValue(mockUser);
            user_query_1.userQuery.updateUser.mockResolvedValue(mockUser);
            yield (0, user_controller_1.updateUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to update user', mockUser);
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_query_1.userQuery.getUserById.mockResolvedValue(null);
            yield (0, user_controller_1.updateUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'User not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserById.mockRejectedValue(mockError);
            user_query_1.userQuery.updateUser.mockRejectedValue(mockError);
            yield (0, user_controller_1.updateUser)(req, res);
            expect(user_query_1.userQuery.getUserById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUserProjects', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return user projects', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProjects = [{ id: 1, name: 'Project 1' }];
            user_query_1.userQuery.getUserProjects.mockResolvedValue(mockProjects);
            project_query_1.projectQuery.getProjects.mockResolvedValue(mockProjects);
            yield (0, user_controller_1.getUserProjects)(req, res);
            expect(user_query_1.userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get user projects', mockProjects);
        }));
        it('should return 404 if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            user_query_1.userQuery.getUserProjects.mockResolvedValue([]);
            yield (0, user_controller_1.getUserProjects)(req, res);
            expect(user_query_1.userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'User has no projects');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserProjects.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUserProjects)(req, res);
            expect(user_query_1.userQuery.getUserProjects).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUserRoles', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return user roles', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRoles = [{ id: 1, name: 'Role 1' }];
            user_query_1.userQuery.getUserRoles.mockResolvedValue(mockRoles);
            yield (0, user_controller_1.getUserRoles)(req, res);
            expect(user_query_1.userQuery.getUserRoles).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get user roles', mockRoles);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserRoles.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUserRoles)(req, res);
            expect(user_query_1.userQuery.getUserRoles).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUserPhones', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return user phones', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockPhones = [{ id: 1, number: '123-456-7890' }];
            user_query_1.userQuery.getUserPhones.mockResolvedValue(mockPhones);
            yield (0, user_controller_1.getUserPhones)(req, res);
            expect(user_query_1.userQuery.getUserPhones).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get user phones', mockPhones);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserPhones.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUserPhones)(req, res);
            expect(user_query_1.userQuery.getUserPhones).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getUserAddresses', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return user addresses', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockAddresses = [{ id: 1, address: '123 Main St' }];
            user_query_1.userQuery.getUserAddresses.mockResolvedValue(mockAddresses);
            yield (0, user_controller_1.getUserAddresses)(req, res);
            expect(user_query_1.userQuery.getUserAddresses).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get user addresses', mockAddresses);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            user_query_1.userQuery.getUserAddresses.mockRejectedValue(mockError);
            yield (0, user_controller_1.getUserAddresses)(req, res);
            expect(user_query_1.userQuery.getUserAddresses).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5jb250cm9sbGVyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ1c2VyLmNvbnRyb2xsZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLDhFQVVrRDtBQUNsRCxzRUFBa0U7QUFDbEUsZ0VBQTREO0FBQzVELGdFQUd3QztBQUV4QyxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsU0FBUyxFQUFFO1FBQ1QsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDckIsUUFBUSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDbkIsV0FBVyxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDdEIsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDckIsVUFBVSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDckIsZUFBZSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDMUIsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDdkIsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7UUFDeEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtLQUM1QjtDQUNGLENBQUMsQ0FBQyxDQUFDO0FBRUosSUFBSSxDQUFDLElBQUksQ0FBQyxvQ0FBb0MsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JELFlBQVksRUFBRTtRQUNaLFdBQVcsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0tBQ3ZCO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakQsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDeEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUM1QixDQUFDLENBQUMsQ0FBQztBQUVK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