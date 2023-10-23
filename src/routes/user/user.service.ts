import { Injectable, HttpException, HttpStatus, } from '@nestjs/common';
import { InjectRepository, } from '@nestjs/typeorm';
import { Board, } from 'src/entity/board.entity';
import { hash, compare, } from 'bcrypt';
import { User, } from 'src/entity/user.entity';
import { Repository, } from 'typeorm';
import { CreateUserDto, } from './dto/create-user.dto';
import { LoginUserDto, } from './dto/login-user.dto';
import * as jwt from 'jsonwebtoken';
import { config, } from 'dotenv';

config({ path: '.env.local', });

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto) {
    const { username, name, password, } = data;
    const encryptPassword = await this.encryptPassword(password);

    return this.userRepository.save({
      username,
      name,
      password: encryptPassword,
    });
  }

  async getUserByUsername(username: string) {
    return this.userRepository.findOneBy({ username, });
  }

  async login(data: LoginUserDto) {
    const { username, password, } = data;

    const user = await this.getUserByUsername(username);
    if (!user) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const match = await compare(password, user.password);
    if (!match) throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    const payload = {
      username,
      name: user.name,
    };

    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h', });

    return {
      user,
      accessToken,
    };
  }

  async getUser() {
    const qb = this.userRepository.createQueryBuilder();

    qb.addSelect((subQuery) => {
      return subQuery
        .select('count(id)')
        .from(Board, 'Board')
        .where('Board.userId = User.id');
    }, 'User_boardCount');

    return qb.getMany();
  }

  async encryptPassword(password) {
    const DEFAULT_SALT = 11;

    return hash(password, DEFAULT_SALT);
  }
}
