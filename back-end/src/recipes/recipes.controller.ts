import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { plainToInstance } from 'class-transformer';
import { RecipeResponseDto } from './dto/recipe-response.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { GetRecipesQueryDto } from './dto/get-recipes-query.dto';
import { RecipesResponseDto } from './dto/recipes-response.dto';

@ApiBearerAuth()
@ApiTags('recipes')
@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  @ApiOperation({ summary: 'Cria uma nova receita' })
  @ApiCreatedResponse({
    description: 'Receita criada com sucesso',
    type: RecipeResponseDto,
  })
  createRecipe(@Body() createRecipeDto: CreateRecipeDto) {
    return plainToInstance(
      RecipeResponseDto,
      this.recipesService.createRecipe(createRecipeDto),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retorna os dados de uma receita' })
  @ApiResponse({
    status: 200,
    description: 'operação bem-sucedida',
    type: RecipeResponseDto,
  })
  getRecipe(@Param('id') id: string) {
    return plainToInstance(
      RecipeResponseDto,
      this.recipesService.getRecipe(id),
    );
  }

  @Get()
  @ApiOperation({ summary: 'Retorna uma lista de receitas' })
  @ApiResponse({
    status: 200,
    description: 'operação bem-sucedida',
    type: RecipesResponseDto,
  })
  getRecipes(@Query() query: GetRecipesQueryDto) {
    return plainToInstance(
      RecipesResponseDto,
      this.recipesService.getRecipes(query),
    );
  }

  /*   @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipesService.update(id, updateRecipeDto);
  } */

  @Delete(':id')
  @ApiOperation({ summary: 'Remove uma receita' })
  @ApiResponse({
    status: 200,
    description: 'operação bem-sucedida',
  })
  deleteRecipe(@Param('id') id: string) {
    return this.recipesService.deleteRecipe(id);
  }
}
