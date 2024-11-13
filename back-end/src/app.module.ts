import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Logger, Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { HealthModule } from './health/health.module';
import { PrismaModule, loggingMiddleware } from 'nestjs-prisma';
import { RecipesModule } from './recipes/recipes.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule.forRootAsync({
      isGlobal: true,
      useFactory: () => ({
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log',
          }),
        ],
      }),
    }),
    AuthModule,
    UsersModule,
    RecipesModule,
    HealthModule,
  ],
})
export class AppModule {}
