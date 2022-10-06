import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class DeleteFromFavDto {
  @ApiProperty({ example: "1", description: "id валюты" })
  @IsNumber({}, { message: "Должно быть числом" })
  readonly idCurrency: number;

  @ApiProperty({ example: "1", description: "id пользователя" })
  @IsString({ message: "Должно быть строкой" })
  readonly _id: string;
}
