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
    const recipe = await this.prisma.recipe.create({
      data: {
        name: body.name,
        ingredients: body.ingredients,
        instructions: body.instructions,
        preparationTime: body.preparationTime,
        difficulty: body.difficulty,
      },
    });

    return recipe;
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({
      where: { id },
    });

    if (!recipe || recipe.deletedAt)
      throw new NotFoundError('Receita não encontrada');

    return recipe;
  }

  async getRecipes(query: GetRecipesQueryDto) {
    const where = {
      name: {
        contains: query.search || '',
        mode: Prisma.QueryMode.insensitive,
      },
      deletedAt: null,
    };

    const [recipes, total] = await this.prisma.$transaction([
      this.prisma.recipe.findMany({
        where,
        skip: (query.page - 1) * query.per_page,
        take: query.per_page,
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
