import { PrismaClient } from '@prisma/client';

const projects = require('./seeder/projects.json');

const prisma = new PrismaClient();

async function main() {
  for (const proj of projects) {
    const project = await prisma.project.create({
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
      const user = await prisma.user.findUnique({ where: { username } });
      if (user) {
        await prisma.projectAssignment.create({
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
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
