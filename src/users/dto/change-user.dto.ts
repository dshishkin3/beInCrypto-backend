import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString, Length } from "class-validator";

export class ChangeUserDto {
  @ApiProperty({ example: "1", description: "id пользователя" })
  @IsString({ message: "Должно быть строкой" })
  readonly _id: string;

  @ApiProperty({ example: "Alexander", description: "Имя пользователя" })
  @IsString({ message: "Должно быть строкой" })
  @IsOptional()
  readonly username: string;

  @ApiProperty({ example: "user@mail.ru", description: "Почтовый адрес" })
  @IsString({ message: "Должно быть строкой" })
  @IsEmail({}, { message: "Некорректный e-mail" })
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: "123456789", description: "Пароль" })
  @IsString({ message: "Должно быть строкой" })
  @Length(4, 20, { message: "Пароль должен быть не меньше 4 и не больше 20" })
  @IsOptional()
  readonly password: string;
}
