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
const employees = require('./seeder/employees.json');
const prisma = new client_1.PrismaClient();
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (const emp of employees) {
            const user = yield prisma.user.create({
                data: {
                    username: emp.username,
                    password: emp.password,
                    firstName: emp.name.first,
                    lastName: emp.name.last,
                    ssn: emp.ssn,
                    dob: new Date(emp.dob),
                    hiredOn: new Date(emp.hiredOn),
                    terminatedOn: emp.terminatedOn ? new Date(emp.terminatedOn) : null,
                    email: emp.email,
                    department: emp.department,
                    gender: emp.gender,
                    portrait: emp.portrait,
                    thumbnail: emp.thumbnail,
                    addresses: {
                        create: {
                            street: emp.address.street,
                            city: emp.address.city,
                            state: emp.address.state,
                            zip: emp.address.zip,
                        },
                    },
                    phones: {
                        create: emp.phones.map((phone) => ({
                            type: phone.type,
                            number: phone.number,
                        })),
                    },
                    roles: {
                        create: emp.roles.map((role) => ({ role })),
                    },
                },
            });
            console.log(`User ${user.username} created.`);
        }
        console.log('Seeding complete');
    });
}
main()
    .catch((e) => console.error(e))
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wbG95ZWUtbW9jay5qcyIsInNvdXJjZVJvb3QiOiIuL3NyYy8iLCJzb3VyY2VzIjpbIi4uL3ByaXNtYS9lbXBsb3llZS1tb2NrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsMkNBQThDO0FBRTlDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBRXJELE1BQU0sTUFBTSxHQUFHLElBQUkscUJBQVksRUFBRSxDQUFDO0FBRWxDLFNBQWUsSUFBSTs7UUFDakIsS0FBSyxNQUFNLEdBQUcsSUFBSSxTQUFTLEVBQUUsQ0FBQztZQUM1QixNQUFNLElBQUksR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO2dCQUNwQyxJQUFJLEVBQUU7b0JBQ0osUUFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRO29CQUN0QixRQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7b0JBQ3RCLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUs7b0JBQ3pCLFFBQVEsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUk7b0JBQ3ZCLEdBQUcsRUFBRSxHQUFHLENBQUMsR0FBRztvQkFDWixHQUFHLEVBQUUsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQztvQkFDdEIsT0FBTyxFQUFFLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUM7b0JBQzlCLFlBQVksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ2xFLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztvQkFDaEIsVUFBVSxFQUFFLEdBQUcsQ0FBQyxVQUFVO29CQUMxQixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU07b0JBQ2xCLFFBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtvQkFDdEIsU0FBUyxFQUFFLEdBQUcsQ0FBQyxTQUFTO29CQUN4QixTQUFTLEVBQUU7d0JBQ1QsTUFBTSxFQUFFOzRCQUNOLE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU07NEJBQzFCLElBQUksRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUk7NEJBQ3RCLEtBQUssRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUs7NEJBQ3hCLEdBQUcsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUc7eUJBQ3JCO3FCQUNGO29CQUNELE1BQU0sRUFBRTt3QkFDTixNQUFNLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUF1QyxFQUFFLEVBQUUsQ0FBQyxDQUFDOzRCQUNuRSxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUk7NEJBQ2hCLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTTt5QkFDckIsQ0FBQyxDQUFDO3FCQUNKO29CQUNELEtBQUssRUFBRTt3QkFDTCxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO3FCQUNwRDtpQkFDRjthQUNGLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxJQUFJLENBQUMsUUFBUSxXQUFXLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7Q0FBQTtBQUVELElBQUksRUFBRTtLQUNILEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QixPQUFPLENBQUMsR0FBUyxFQUFFO0lBQ2xCLE1BQU0sTUFBTSxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUMifQ==