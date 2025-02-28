import { PrismaClient } from '@prisma/client';

const employees = require('./seeder/employees.json');

const prisma = new PrismaClient();

async function main() {
  for (const emp of employees) {
    const user = await prisma.user.create({
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
          create: emp.phones.map((phone: { type: string; number: string }) => ({
            type: phone.type,
            number: phone.number,
          })),
        },
        roles: {
          create: emp.roles.map((role: string) => ({ role })),
        },
      },
    });
    console.log(`User ${user.username} created.`);
  }

  console.log('Seeding complete');
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
