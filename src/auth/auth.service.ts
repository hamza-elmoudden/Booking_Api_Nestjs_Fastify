import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';



@Injectable()
export class AuthService {
  constructor(private readonly userserviec: UserService, private readonly jwtService: JwtService) { }

  async validateUser(email: string, pass: string): Promise<any> {

    const user = await this.userserviec.FindUserByEmail(email)

    if (user && (await this.userserviec.compare(pass, user?.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user) {
    const payload = { name: user.name, id: user.id };

    const Token = this.jwtService.sign(payload)

    return {
      access_token: Token,

    };
  }
}
