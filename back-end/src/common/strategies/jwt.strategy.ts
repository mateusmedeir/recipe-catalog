import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../../auth/auth.service';
import authConfig from '../../auth/config/auth.config';
import { UnauthorizedError } from 'src/common/exceptions';

export interface JwtPayload {
  email: string;
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfiguration.JWT_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = this.authService.validateUser(payload);

    if (!user) throw new UnauthorizedError('Token inválido');

    return user;
  }
}
