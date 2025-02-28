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
const project_query_1 = require("../../../src/queries/project.query");
const client_1 = __importDefault(require("../../../prisma/client"));
describe('Project Query', () => {
    describe('getProjects', () => {
        it('should return all projects', () => __awaiter(void 0, void 0, void 0, function* () {
            const projects = yield project_query_1.projectQuery.getProjects({});
            expect(projects).toBeDefined();
        }));
        it('should return an empty array if no projects are found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.project, 'findMany').mockResolvedValue([]);
                yield project_query_1.projectQuery.getProjects({});
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('getProjectById', () => {
        it('should return a project by id', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.project, 'findUnique').mockResolvedValue({
                id: 1,
                name: 'Test Project',
                department: 'Test Department',
                description: 'Test Description',
                startedOn: new Date(),
                endedOn: new Date(),
            });
            try {
                const project = yield project_query_1.projectQuery.getProjectById(1);
                expect(project).toBeDefined();
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return null if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.project, 'findUnique').mockResolvedValue(null);
                yield project_query_1.projectQuery.getProjectById(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('createProject', () => {
        it('should create a project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.project, 'create').mockResolvedValue({
                id: 1,
                name: 'Test Project',
                department: 'Test Department',
                description: 'Test Description',
                startedOn: new Date(),
                endedOn: new Date(),
            });
            try {
                const project = yield project_query_1.projectQuery.createProject({
                    id: 1,
                    name: 'Test Project',
                    department: 'Test Department',
                    description: 'Test Description',
                    startedOn: new Date(),
                    endedOn: new Date(),
                });
                expect(project).toBeDefined();
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return null if project not created', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest
                    .spyOn(client_1.default.project, 'create')
                    .mockRejectedValue(new Error('Project not created'));
                yield project_query_1.projectQuery.createProject({
                    id: 1,
                    name: 'Test Project',
                    department: 'Test Department',
                    description: 'Test Description',
                    startedOn: new Date(),
                    endedOn: new Date(),
                });
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('updateProject', () => {
        it('should update a project', () => __awaiter(void 0, void 0, void 0, function* () {
            const project = yield project_query_1.projectQuery.updateProject(1, {
                id: 1,
                name: 'Test Project',
                department: 'Test Department',
                description: 'Test Description',
                startedOn: new Date(),
                endedOn: new Date(),
            });
            expect(project).toBeDefined();
        }));
    });
    describe('deleteProject', () => {
        it('should delete a project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.project, 'delete').mockResolvedValue({
                id: 1,
                name: 'Test Project',
                department: 'Test Department',
                description: 'Test Description',
                startedOn: new Date(),
                endedOn: new Date(),
            });
            const project = yield project_query_1.projectQuery.deleteProject(1);
            expect(project).toBeDefined();
        }));
        it('should return null if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest
                    .spyOn(client_1.default.project, 'delete')
                    .mockRejectedValue(new Error('Project not found'));
                yield project_query_1.projectQuery.deleteProject(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('getProjectAssignments', () => {
        it('should return all assignments for a project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([
                {
                    id: 1,
                    projectId: 1,
                    userId: 1,
                },
            ]);
            const assignments = yield project_query_1.projectQuery.getProjectAssignments(1);
            expect(assignments).toBeDefined();
        }));
        it('should return an empty array if no assignments are found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([]);
                yield project_query_1.projectQuery.getProjectAssignments(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.project, 'findUnique').mockResolvedValue(null);
                yield project_query_1.projectQuery.getProjectAssignments(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if project has no assignments', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([]);
                yield project_query_1.projectQuery.getProjectAssignments(1);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('getProjectUsers', () => {
        it('should return all users for a project', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([
                {
                    id: 1,
                    projectId: 1,
                    userId: 1,
                },
            ]);
            jest.spyOn(client_1.default.user, 'findMany').mockResolvedValue([
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
                const users = yield project_query_1.projectQuery.getProjectUsers(1);
                expect(users).toBeDefined();
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return all users for a project with no assignments', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.user, 'findMany').mockResolvedValue([
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
                const users = yield project_query_1.projectQuery.getProjectUsers(1);
                expect(users).toBeDefined();
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if no users are found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.projectAssignment, 'findMany').mockResolvedValue([]);
            try {
                const users = yield project_query_1.projectQuery.getProjectUsers(1);
                expect(users).toEqual([]);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if no users are found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield project_query_1.projectQuery.getProjectUsers(1);
                expect(users).toBeDefined();
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if no users are found', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                jest.spyOn(client_1.default.user, 'findMany').mockResolvedValue([]);
                yield project_query_1.projectQuery.getProjectUsers(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.project, 'findUnique').mockResolvedValue(null);
            try {
                yield project_query_1.projectQuery.getProjectUsers(999);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
        it('should return an empty array if project has no users', () => __awaiter(void 0, void 0, void 0, function* () {
            jest.spyOn(client_1.default.user, 'findMany').mockResolvedValue([]);
            try {
                yield project_query_1.projectQuery.getProjectUsers(1);
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5xdWVyeS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicHJvamVjdC5xdWVyeS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsc0VBQWtFO0FBQ2xFLG9FQUE0QztBQUU1QyxRQUFRLENBQUMsZUFBZSxFQUFFLEdBQUcsRUFBRTtJQUM3QixRQUFRLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRTtRQUMzQixFQUFFLENBQUMsNEJBQTRCLEVBQUUsR0FBUyxFQUFFO1lBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sNEJBQVksQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7WUFDcEQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ2pDLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFFSCxFQUFFLENBQUMsdURBQXVELEVBQUUsR0FBUyxFQUFFO1lBQ3JFLElBQUksQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUU3RCxNQUFNLDRCQUFZLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dCQUNmLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUM5QixDQUFDO1FBQ0gsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEdBQUcsRUFBRTtRQUM5QixFQUFFLENBQUMsK0JBQStCLEVBQUUsR0FBUyxFQUFFO1lBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsZ0JBQU0sQ0FBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUMsaUJBQWlCLENBQUM7Z0JBQ3pELEVBQUUsRUFBRSxDQUFD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