import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

const prismaClient = new PrismaClient();
const logger = new Logger('PrismaSeeder');

export async function createUsers() {
  try {
    const config = {
      usersAmount: 20,
    };

    await prismaClient.recipe.deleteMany();
    await prismaClient.user.deleteMany();

    await prismaClient.user.createMany({
      data: Array.from({ length: config.usersAmount }, () => ({
        name: faker.person.firstName() + ' ' + faker.person.lastName(),
        email: faker.internet.email(),
        password: bcrypt.hashSync('123456', bcrypt.genSaltSync(10)),
      })),
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao criar usuários: ${error.message}`);
    }
    logger.error(`Erro ao criar usuários: ${error}`);
  }
}

(async () => {
  logger.log('Conectando ao banco de dados...');
  await prismaClient.$connect();

  await createUsers();
})()
  .catch((error) => {
    if (error instanceof Error) {
      logger.error(`Erro no prisma seeder: ${error.message}`);
    }

    logger.error(`Erro no prisma seeder: ${error}`);
  })
  .finally(async () => {
    logger.log('Desconectando do banco de dados...');
    await prismaClient.$disconnect();
  });
