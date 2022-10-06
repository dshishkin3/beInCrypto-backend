import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

import { ChangeUserDto } from "src/users/dto/change-user.dto";
import { User } from "src/auth/schemas/schema.user";
import { AddToFavDto } from "./dto/add-favorites.dto";
import { DeleteFromFavDto } from "./dto/delete-favorites.dto";
import { UsersService } from "./users.service";
import { ValidationPipe } from "src/pipes/validation.pipe";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@ApiTags("users")
@Controller("users")
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: "Изменение информации о пользователе" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Put("/change")
  change(@Body() userDto: ChangeUserDto) {
    return this.usersService.change(userDto);
  }

  @ApiOperation({ summary: "Проверка пользователя" })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(JwtAuthGuard)
  @Post("/:id")
  check(@Param("id") id) {
    return this.usersService.checkUser(id);
  }

  @ApiOperation({ summary: "Удалить пользователя" })
  @ApiResponse({ status: 200, type: User })
  @Delete("/delete")
  delete(@Body() _id: string) {
    return this.usersService.deleteUser(_id);
  }

  @ApiOperation({ summary: "Добавить в избранное" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Post("/addToFavorites")
  addFavorites(@Body() favDto: AddToFavDto) {
    return this.usersService.addToFavorites(favDto);
  }

  @ApiOperation({ summary: "Удалить из избранного" })
  @ApiResponse({ status: 200, type: User })
  @UsePipes(ValidationPipe)
  @Delete("/deleteFromFavorites")
  deleteFavorites(@Body() favDto: DeleteFromFavDto) {
    return this.usersService.deleteFromFavorites(favDto);
  }
}
