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
const project_controller_1 = require("../../../src/controllers/project.controller");
const project_query_1 = require("../../../src/queries/project.query");
const helper_util_1 = require("../../../src/utils/helper.util");
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
        it('should return projects successfully', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProjects = [{ id: 1, name: 'Project 1' }];
            project_query_1.projectQuery.getProjects.mockResolvedValue(mockProjects);
            yield (0, project_controller_1.getProjects)(req, res);
            expect(project_query_1.projectQuery.getProjects).toHaveBeenCalledWith({});
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get projects', mockProjects);
        }));
        it('should handle errors properly', () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                project_query_1.projectQuery.getProjects.mockRejectedValue(new Error('Database error'));
                yield (0, project_controller_1.getProjects)(req, res);
                expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
            }
            catch (error) {
                expect(error).toBeDefined();
            }
        }));
    });
    describe('getProjectById', () => {
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
        it('should return project by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProject = { id: 1, name: 'Project 1' };
            project_query_1.projectQuery.getProjectById.mockResolvedValue(mockProject);
            yield (0, project_controller_1.getProjectById)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get project', mockProject);
        }));
        it('should return 404 if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            project_query_1.projectQuery.getProjectById.mockResolvedValue(null);
            yield (0, project_controller_1.getProjectById)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'Project not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.getProjectById.mockRejectedValue(mockError);
            yield (0, project_controller_1.getProjectById)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('createProject ', () => {
        let req;
        let res;
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
        it('should create a new project and return success response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProject = Object.assign({ id: 1 }, req.body);
            project_query_1.projectQuery.createProject.mockResolvedValue(mockProject);
            yield (0, project_controller_1.createProject)(req, res);
            expect(project_query_1.projectQuery.createProject).toHaveBeenCalledWith(req.body);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Project created successfully', mockProject);
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.createProject.mockRejectedValue(mockError);
            yield (0, project_controller_1.createProject)(req, res);
            expect(project_query_1.projectQuery.createProject).toHaveBeenCalledWith(req.body);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('updateProject', () => {
        let req;
        let res;
        beforeEach(() => {
            req = { params: { id: 1 }, body: { name: 'Project 1' } };
            res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };
            jest.clearAllMocks();
        });
        it('should return update project by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProject = { id: 1, name: 'Project 1' };
            project_query_1.projectQuery.getProjectById.mockResolvedValue(mockProject);
            project_query_1.projectQuery.updateProject.mockResolvedValue(mockProject);
            yield (0, project_controller_1.updateProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Project updated successfully', mockProject);
        }));
        it('should return 404 if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            project_query_1.projectQuery.getProjectById.mockResolvedValue(null);
            yield (0, project_controller_1.updateProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'Project not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.getProjectById.mockRejectedValue(mockError);
            project_query_1.projectQuery.updateProject.mockRejectedValue(mockError);
            yield (0, project_controller_1.updateProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('deleteProject', () => {
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
        it('should return delete project by id', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProject = { id: 1, name: 'Project 1' };
            project_query_1.projectQuery.getProjectById.mockResolvedValue(mockProject);
            project_query_1.projectQuery.deleteProject.mockResolvedValue(mockProject);
            yield (0, project_controller_1.deleteProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(project_query_1.projectQuery.deleteProject).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Project deleted successfully', mockProject);
        }));
        it('should return 404 if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            project_query_1.projectQuery.getProjectById.mockResolvedValue(null);
            yield (0, project_controller_1.deleteProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'Project not found');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.getProjectById.mockRejectedValue(mockError);
            project_query_1.projectQuery.deleteProject.mockRejectedValue(mockError);
            yield (0, project_controller_1.deleteProject)(req, res);
            expect(project_query_1.projectQuery.getProjectById).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getProjectAssignments', () => {
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
            project_query_1.projectQuery.getProjectAssignments.mockResolvedValue(mockProjects);
            yield (0, project_controller_1.getProjectAssignments)(req, res);
            expect(project_query_1.projectQuery.getProjectAssignments).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get project assignments', mockProjects);
        }));
        it('should return 404 if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            project_query_1.projectQuery.getProjectAssignments.mockResolvedValue([]);
            yield (0, project_controller_1.getProjectAssignments)(req, res);
            expect(project_query_1.projectQuery.getProjectAssignments).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'Project has no assignments');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.getProjectAssignments.mockRejectedValue(mockError);
            yield (0, project_controller_1.getProjectAssignments)(req, res);
            expect(project_query_1.projectQuery.getProjectAssignments).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
    describe('getProjectUsers', () => {
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
        it('should return project users', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockProjects = [{ id: 1, name: 'Project 1' }];
            project_query_1.projectQuery.getProjectUsers.mockResolvedValue(mockProjects);
            project_query_1.projectQuery.getProjects.mockResolvedValue(mockProjects);
            yield (0, project_controller_1.getProjectUsers)(req, res);
            expect(project_query_1.projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnSuccess).toHaveBeenCalledWith(req, res, 200, 'Success to get project users', mockProjects);
        }));
        it('should return 404 if project not found', () => __awaiter(void 0, void 0, void 0, function* () {
            project_query_1.projectQuery.getProjectUsers.mockResolvedValue([]);
            yield (0, project_controller_1.getProjectUsers)(req, res);
            expect(project_query_1.projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 404, 'Project has no users');
        }));
        it('should handle errors and return 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockError = new Error('Database error');
            project_query_1.projectQuery.getProjectUsers.mockRejectedValue(mockError);
            yield (0, project_controller_1.getProjectUsers)(req, res);
            expect(project_query_1.projectQuery.getProjectUsers).toHaveBeenCalledWith(req.params.id);
            expect(helper_util_1.returnNonSuccess).toHaveBeenCalledWith(req, res, 500, 'Internal Server Error');
        }));
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdC5jb250cm9sbGVyLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm9qZWN0LmNvbnRyb2xsZXIudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUFBLG9GQVFxRDtBQUNyRCxzRUFBa0U7QUFDbEUsZ0VBR3dDO0FBRXhDLElBQUksQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNyRCxZQUFZLEVBQUU7UUFDWixXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUN0QixjQUFjLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUN6QixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUN4QixhQUFhLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUN4QixlQUFlLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtRQUMxQixxQkFBcUIsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0tBQ2pDO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFFSixJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDakQsYUFBYSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7SUFDeEIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtDQUM1QixDQUFDLENBQUMsQ0FBQztBQUVKLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxHQUFHLEVBQUU7SUFDbEMsUUFBUSxDQUFDLGFBQWEsRUFBRSxHQUFHLEVBQUU7UUFDM0IsSUFBSSxHQUFRLENBQUM7UUFDYixJQUFJLEdBQVEsQ0FBQztRQUViLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDZCxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ1QsR0FBRyxHQUFHO2dCQUNKLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENB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