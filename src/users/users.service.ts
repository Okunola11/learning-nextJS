import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: "Leanne Graham",
      username: "leanne",
      password: "aaaa",
      email: "Sincere@april.biz",
      role: "INTERN",
    },
    {
      id: 2,
      name: "Ervin Howell",
      username: "howell",
      password: "aaaa",
      email: "Shanna@melissa.tv",
      role: "INTERN",
    },
    {
      id: 3,
      name: "Clementine Bauch",
      username: "bauch",
      password: "aaaa",
      email: "Nathan@yesenia.net",
      role: "ENGINEER",
    },
    {
      id: 4,
      name: "Patricia Lebsack",
      username: "patricia",
      password: "aaaa",
      email: "Julianne.OConner@kory.org",
      role: "ENGINEER",
    },
    {
      id: 5,
      name: "Chelsey Dietrich",
      username: "chelsea",
      password: "aaaa",
      email: "Lucio_Hettinger@annie.ca",
      role: "ADMIN",
    },
  ];

  findAll(role?: "INTERN" | "ENGINEER" | "ADMIN") {
    if (role) {
      const rolesArray = this.users.filter((user) => user.role === role);
      if (!rolesArray.length)
        throw new NotFoundException("User Role Not Found");
      return rolesArray;
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);

    if (!user) throw new NotFoundException("User Not Found");

    return user;
  }

  findUser(username: string) {
    const user = this.users.find((user) => user.username === username);

    if (!user) throw new NotFoundException("User Not Found");

    return user;
  }

  create(user: CreateUserDto) {
    const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: usersByHighestId[0].id + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...updatedUser };
      }
      return user;
    });
    return this.findOne(id);
  }

  delete(id: number) {
    const deletedUser = this.findOne(id);

    this.users = this.users.filter((user) => user.id !== id);

    return deletedUser;
  }
}
