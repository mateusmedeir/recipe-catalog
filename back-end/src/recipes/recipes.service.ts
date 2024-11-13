import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { NotFoundError } from 'src/common/exceptions';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipesService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createRecipeDto: CreateRecipeDto) {
    const recipe = await this.prisma.recipe.create({
      data: {
        ...createRecipeDto,
      },
    });
    return recipe;
  }

  getRecipes() {
    return this.prisma.recipe.findMany();
  }

  async getRecipe(id: string) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe) throw new NotFoundError('Receita não encontrada');

    return recipe;
  }

  async update(id: string, updateRecipeDto: UpdateRecipeDto) {
    const recipe = await this.prisma.recipe.findUnique({ where: { id } });

    if (!recipe) throw new NotFoundError('Receita não encontrada');

    return this.prisma.recipe.update({
      where: { id },
      data: {
        ...updateRecipeDto,
      },
    });
  }

  remove(id: string) {
    return `This action removes a #${id} recipe`;
  }
}
