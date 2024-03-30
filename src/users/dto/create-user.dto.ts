import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsEnum(["INTERN", "ENGINEER", "ADMIN"], {
    message: "Valid role required",
  })
  role: "INTERN" | "ENGINEER" | "ADMIN  ";
}
