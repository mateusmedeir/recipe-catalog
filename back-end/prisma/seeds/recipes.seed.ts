import { faker } from '@faker-js/faker';
import { Logger } from '@nestjs/common';
import { PrismaClient, RecipeDifficulty } from '@prisma/client';

const prismaClient = new PrismaClient();
const logger = new Logger('PrismaSeeder');

export async function createRecipes() {
  const config = {
    recipesAmount: 10,
    ingredientsAmount: 8,
    instructionsAmount: 5,
  };
  const difficultyLevels = [
    RecipeDifficulty.EASY,
    RecipeDifficulty.MEDIUM,
    RecipeDifficulty.HARD,
  ];

  try {
    await prismaClient.recipe.deleteMany();

    const users = await prismaClient.user.findMany();

    users.map(async () => {
      for (let i = 0; i < config.recipesAmount; i++) {
        await prismaClient.recipe.create({
          data: {
            name: faker.food.dish(),
            ingredients: Array.from(
              {
                length: Math.floor(
                  Math.random() * (config.ingredientsAmount - 1) + 1,
                ),
              },
              () => faker.food.ingredient(),
            ),
            instructions: Array.from(
              {
                length: Math.floor(
                  Math.random() * (config.instructionsAmount - 1) + 1,
                ),
              },
              () => faker.lorem.sentence(),
            ),
            preparationTime: Math.floor(Math.random() * 120),
            difficulty: difficultyLevels[Math.floor(Math.random() * 3)],
          },
        });
      }
    });
  } catch (error) {
    if (error instanceof Error) {
      logger.error(`Erro ao criar receitas: ${error.message}`);
    }
    logger.error(`Erro ao criar receitas: ${error}`);
  }
}

(async () => {
  logger.log('Conectando ao banco de dados...');
  await prismaClient.$connect();

  await createRecipes();
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
