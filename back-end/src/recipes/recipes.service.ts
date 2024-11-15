import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { NotFoundError } from 'src/common/exceptions';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { GetRecipesQueryDto } from './dto/get-recipes-query.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async createRecipe(body: CreateRecipeDto) {
    const recipeIngredients = [];
    const recipe = await this.prisma.recipe.create({
      data: {
        name: body.name,
        instructions: body.instructions,
      },
      include: {
        ingredients: true,
      },
    });

    await Promise.all(
      body.ingredients.map(async (recipeIngredient) => {
        let ingredient = await this.prisma.ingredient.findUnique({
          where: { name: recipeIngredient.name },
          select: { id: true },
        });
        if (!ingredient) {
          ingredient = await this.prisma.ingredient.create({
            data: { name: recipeIngredient.name },
            select: { id: true },
          });
        }

        recipeIngredients.push(
          await this.prisma.recipeIngredient.create({
            data: {
              amount: recipeIngredient.amount,
              recipeId: recipe.id,
              ingredientId: ingredient.id,
            },
          }),
        );
      }),
    );

    recipe.ingredients = recipeIngredients;

    return recipe;
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
      include: { ingredients: true },
    });

    if (!recipe || recipe.deletedAt)
      throw new NotFoundError('Receita não encontrada');

    return recipe;
  }

  async getRecipes(query: GetRecipesQueryDto) {
    const where = {
      name: {
        contains: query.name || '',
        mode: Prisma.QueryMode.insensitive,
      },
      deletedAt: null,
    };

    const [recipes, total] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where: where,
        skip: (query.page - 1) * query.total,
        take: query.total,
        include: { ingredients: true },
      }),
      this.prisma.recipe.count({ where }),
    ]);

    return { data: recipes, total };
  }

  /*   async update(id: string, body: UpdateRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe) throw new NotFoundError('Receita não encontrada');

    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...body,
      },
    });
  } */

  async deleteRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });
    if (!recipe) throw new NotFoundError('Receita não encontrada');

    await this.prisma.recipe.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });
    return true;
  }
}
