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
const client_1 = require("@prisma/client");
const projects = require('./seeder/projects.json');
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const proj of projects) {
            const project = yield prisma.project.create({
                data: {
                    id: proj.id,
                    name: proj.name,
                    department: proj.department,
                    startedOn: new Date(proj.startedOn),
                    endedOn: proj.endedOn ? new Date(proj.endedOn) : null,
                    description: proj.description,
                },
            });
            console.log(`Project ${project.name} created.`);
        }
        for (const proj of projects) {
            for (const username of proj.assigned) {
                const user = yield prisma.user.findUnique({ where: { username } });
                if (user) {
                    yield prisma.projectAssignment.create({
                        data: {
                            projectId: proj.id,
                            userId: user.id,
                        },
                    });
                    console.log(`Assigned ${username} to project ${proj.name}.`);
                }
            }
        }
        console.log('Seeding complete');
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvamVjdHMtbW9jay5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIi4uL3ByaXNtYS9wcm9qZWN0cy1tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQThDO0FBRTlDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBRW5ELE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0FBRWxDLFNBQWUsSUFBSTs7UUFDakIsS0FBSyxNQUFNLElBQUksSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUM1QixNQUFNLE9BQU8sR0FBRyxNQUFNLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUMxQyxJQUFJLEVBQUU7b0JBQ0osRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFO29CQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVU7b0JBQzNCLFNBQVMsRUFBRSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO29CQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUNyRCxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7aUJBQzlCO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLE9BQU8sQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELENBQUM7UUFFRCxLQUFLLE1BQU0sSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQzVCLEtBQUssTUFBTSxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLElBQUksRUFBRSxDQUFDO29CQUNULE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQzt3QkFDcEMsSUFBSSxFQUFFOzRCQUNKLFNBQVMsRUFBRSxJQUFJLENBQUMsRUFBRTs0QkFDbEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFO3lCQUNoQjtxQkFDRixDQUFDLENBQUM7b0JBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyxZQUFZLFFBQVEsZUFBZSxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDL0QsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FBQTtBQUVELElBQUksRUFBRTtLQUNILEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QixPQUFPLENBQUMsR0FBUyxFQUFFO0lBQ2xCLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==