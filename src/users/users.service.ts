import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import * as bcrypt from "bcryptjs";

import { User, UserDocument } from "src/auth/schemas/schema.user";
import { ChangeUserDto } from "src/users/dto/change-user.dto";
import { AddToFavDto } from "./dto/add-favorites.dto";
import { DeleteFromFavDto } from "./dto/delete-favorites.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService
  ) {}

  async change(dto: ChangeUserDto) {
    let user = Object.assign(dto);

    if (dto.password) {
      user.password = await bcrypt.hash(dto.password, 5);
    }

    await this.userModel.findByIdAndUpdate(dto._id, {
      $set: user,
    });

    return { message: ["User data updated"] };
  }

  async checkUser(_id: string) {
    const user = await this.userModel.findById(_id);

    const token = this.jwtService.sign({ _id: user._id });

    if (!token) {
      throw new UnauthorizedException({
        message: ["The token is expired, or there is no user with this token"],
      });
    }

    if (!user) {
      throw new UnauthorizedException({
        message: ["User is not found"],
      });
    }

    return {
      token: token,
      user: user,
    };
  }

  async deleteUser(_id: string) {
    await this.userModel.findByIdAndDelete(_id);

    return { message: ["User deleted"] };
  }

  async addToFavorites(dto: AddToFavDto) {
    const user = await this.userModel.findById(dto._id);

    const existCurrency = user.favorites.find(
      (currency) => currency.id === dto.currency.id
    );

    if (existCurrency) {
      throw new UnauthorizedException({
        message: ["This currency has already been added to the cart"],
      });
    }

    await user.updateOne({
      $push: {
        favorites: dto.currency,
      },
    });

    return { message: ["Currency added to favorites"] };
  }

  async deleteFromFavorites(dto: DeleteFromFavDto) {
    const user = await this.userModel.findById(dto._id);

    const filteredFavorites = user.favorites.filter(
      (currency) => currency.id !== dto.idCurrency
    );

    await user.updateOne({
      favorites: filteredFavorites,
    });

    return { message: ["Currency removed from favorites"] };
  }
}
