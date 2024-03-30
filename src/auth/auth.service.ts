import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "src/users/users.service";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    username: string,
    pwd: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findUser(username);

    if (user?.password !== pwd) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };

    //const { password, ...result } = user;
    // we generate jwt here

    //return result;
  }
}
