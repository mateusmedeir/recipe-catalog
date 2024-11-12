import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import authConfig from './config/auth.config';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { UsersService } from 'src/users/users.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/common/strategies/jwt.strategy';
import { LocalStrategy } from 'src/common/strategies/local.strategy';

@Module({
  imports: [
    ConfigModule.forFeature(authConfig),
    UsersModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('auth.JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get('auth.JWT_EXPIRES_TIME'),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtModule, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
