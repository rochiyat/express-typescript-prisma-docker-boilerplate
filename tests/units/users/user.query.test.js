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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// tests for user query
const moment_1 = __importDefault(require("moment"));
const user_query_1 = require("../../../src/queries/user.query");
const client_1 = __importDefault(require("../../../prisma/client"));
describe('userQuery', () => {
    describe('getUserById', () => {
        it('should return a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_query_1.userQuery.getUserById(1);
            expect(user).toBeDefined();
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_query_1.userQuery.getUserById(999);
            expect(user).toBeNull();
        }));
    });
    describe('getUsers', () => {
        it('should return all users', () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield user_query_1.userQuery.getUsers();
            expect(users).toBeDefined();
        }));
        it('should return an empty array if no users are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.user, 'findMany').mockResolvedValue([]);
            const users = yield user_query_1.userQuery.getUsers();
            expect(users).toEqual([]);
        }));
    });
    describe('createUser', () => {
        it('should create a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_query_1.userQuery.createUser({
                id: 1,
                username: 'john_doe',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                ssn: '123-45-6789',
                dob: (0, moment_1.default)('1990-01-01T00:00:00.000Z').toDate(),
                hiredOn: (0, moment_1.default)('2021-01-01T00:00:00.000Z').toDate(),
                terminatedOn: (0, moment_1.default)('2021-01-01T00:00:00.000Z').toDate(),
                email: 'user@example.com',
                department: 'Sales',
                gender: 'Male',
                portrait: 'https://example.com/portrait.jpg',
                thumbnail: 'https://example.com/thumbnail.jpg',
            });
            expect(user).toBeDefined();
        }));
    });
    describe('updateUser', () => {
        it('should update a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_query_1.userQuery.updateUser(1, {
                id: 1,
                username: 'john_doe',
                password: 'password123',
                firstName: 'John',
                lastName: 'Doe',
                ssn: '123-45-6789',
                dob: (0, moment_1.default)('1990-01-01T00:00:00.000Z').toDate(),
                hiredOn: (0, moment_1.default)('2021-01-01T00:00:00.000Z').toDate(),
                terminatedOn: (0, moment_1.default)('2021-01-01T00:00:00.000Z').toDate(),
                email: 'user@example.com',
                department: 'Sales',
                gender: 'Male',
                portrait: 'https://example.com/portrait.jpg',
                thumbnail: 'https://example.com/thumbnail.jpg',
            });
            expect(user).toBeDefined();
        }));
    });
    describe('deleteUser', () => {
        it('should delete a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield user_query_1.userQuery.deleteUser(1);
            expect(user).toBeDefined();
        }));
        it('should return null if user not found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest
                    .spyOn(client_1.default.user, 'delete')
                    .mockRejectedValue(new Error('User not found'));
                yield user_query_1.userQuery.deleteUser(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('getUserProjects', () => {
        it('should return all projects for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const projects = yield user_query_1.userQuery.getUserProjects(1);
            expect(projects).toBeDefined();
        }));
        it('should return an empty array if no projects are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([]);
            const projects = yield user_query_1.userQuery.getUserProjects(1);
            expect(projects).toEqual([]);
        }));
    });
    describe('getUserRoles', () => {
        it('should return all roles for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const roles = yield user_query_1.userQuery.getUserRoles(1);
            expect(roles).toBeDefined();
        }));
        it('should return an empty array if no roles are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.userRole, 'findMany').mockResolvedValue([]);
            const roles = yield user_query_1.userQuery.getUserRoles(1);
            expect(roles).toEqual([]);
        }));
    });
    describe('getUserPhones', () => {
        it('should return all phones for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const phones = yield user_query_1.userQuery.getUserPhones(1);
            expect(phones).toBeDefined();
        }));
        it('should return an empty array if no phones are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.userPhone, 'findMany').mockResolvedValue([]);
            const phones = yield user_query_1.userQuery.getUserPhones(1);
            expect(phones).toEqual([]);
        }));
    });
    describe('getUserAddresses', () => {
        it('should return all addresses for a user', () => __awaiter(void 0, void 0, void 0, function* () {
            const addresses = yield user_query_1.userQuery.getUserAddresses(1);
            expect(addresses).toBeDefined();
        }));
        it('should return an empty array if no addresses are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.userAddress, 'findMany').mockResolvedValue([]);
            const addresses = yield user_query_1.userQuery.getUserAddresses(1);
            expect(addresses).toEqual([]);
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5xdWVyeS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci5xdWVyeS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsdUJBQXVCO0FBQ3ZCLG9EQUE0QjtBQUM1QixnRUFBNEQ7QUFDNUQsb0VBQTRDO0FBRTVDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsR0FBRyxFQUFFO0lBQ3pCLFFBQVEsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFO1FBQzNCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxHQUFTLEVBQUU7WUFDcEMsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDN0IsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUVILEVBQUUsQ0FBQyxzQ0FBc0MsRUFBRSxHQUFTLEVBQUU7WUFDcEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxzQkFBUyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLFVBQVUsRUFBRSxHQUFHLEVBQUU7UUFDeEIsRUFBRSxDQUFDLHlCQUF5QixFQUFFLEdBQVMsRUFBRTtZQUN2QyxNQUFNLEtBQUssR0FBRyxNQUFNLHNCQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDekMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzlCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsb0RBQW9ELEVBQUUsR0FBUyxFQUFFO1lBQ2xFLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQyxJQUFJLEVBQUUsVUFBVSxD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