import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "Alexander", description: "Имя пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @Length(3, 30, { message: "Имя должно быть не меньше 3 и не больше 30" })
  readonly username: string;

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный e-mail" })
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 20, { message: "Пароль должен быть не меньше 4 и не больше 20" })
  readonly password: string;
}
