import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { AuthGuard } from "src/auth/auth.guard";

@Controller("users")
//@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() // GET /users or /users?role=value&age=42 (those are query parameters)
  findAll(@Query("role") role?: "INTERN" | "ENGINEER" | "ADMIN") {
    return this.usersService.findAll(role);
  }

  /*  @Get('interns') // GET /users/interns. We dont need this, it's just to show how to order routes.
  findAllInterns() {
    return [];
  } */

  @Get(":id") // GET /users/:id. Params are always string
  findOne(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.findOne(id); // can use parseInt() or unary plus(+) which was used as id expects number
  }

  @Post() // POST /users
  create(
    @Body(ValidationPipe)
    user: CreateUserDto,
  ) {
    return this.usersService.create(user);
  }

  @Patch(":id") // PATCH /users/:id
  update(
    @Param("id", ParseIntPipe) id: number,
    @Body(ValidationPipe)
    userUpdate: UpdateUserDto,
  ) {
    return this.usersService.update(id, userUpdate);
  }

  @Delete(":id") // DELETE /users/:id
  delete(@Param("id", ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
