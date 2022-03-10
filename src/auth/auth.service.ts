import { Injectable } from '@nestjs/common';
// import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CipherService } from '../common/cipher';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    // private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private cipherService: CipherService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    // const user = await this.usersService.findOne(username);
    // if (user && user.password === pass) {
    //   const { password, ...result } = user;
    //   return result;
    // }
    console.log('validateUser: ', username, pass);
    if (username === 'root' && pass === 'root') {
      return { username, pass, roles: ['admin'] };
    }
    return null;
  }

  async login(user: any) {
    console.log('login: ', user);
    const payload = {
      ...user,
      pass: this.cipherService.encryptAES128ECB(
        user.pass,
        jwtConstants.cipherKey,
      ),
    };
    console.log('payload: ', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
