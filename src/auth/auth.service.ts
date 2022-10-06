import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import * as bcrypt from "bcryptjs";
import { InjectModel } from "@nestjs/mongoose";

import { CreateUserDto } from "./dto/create-user.dto";
import { User, UserDocument } from "./schemas/schema.user";
import { LoginUserDto } from "./dto/login-user.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,

    private jwtService: JwtService
  ) {}

  async login(dto: LoginUserDto) {
    const user = await this.validateUser(dto);
    return this.generateToken(user);
  }

  async registration(dto: CreateUserDto) {
    const existUser = await this.userModel.find({ email: dto.email });

    if (existUser.length > 0) {
      throw new UnauthorizedException({
        message: ["User with this e-mail already exists"],
      });
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userModel.create({
      ...dto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }

  private async validateUser(dto: LoginUserDto) {
    const user = await this.userModel.find({ email: dto.email });

    if (!user[0]) {
      throw new UnauthorizedException({
        message: ["User with this e-mail does not exist"],
      });
    }

    const passwordEquals = await bcrypt.compare(dto.password, user[0].password);
    if (user[0] && passwordEquals) {
      return user[0];
    }

    throw new UnauthorizedException({
      message: ["Incorrect e-mail or password"],
    });
  }
}
