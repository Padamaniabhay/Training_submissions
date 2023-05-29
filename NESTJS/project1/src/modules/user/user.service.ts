import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createUserDto } from "./dtos/create-user.dto";
import { updateUserDto } from "./dtos/update-user.dto";
import { User } from "../../entity/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private UserRepository: Repository<User>,
  ) {}

  async getuserById(id: number) {
    const user = await this.UserRepository.findOne({ where: { id } });
    if (!user) return new NotFoundException("user not found");
    return user;
  }

  async createUser(user: createUserDto) {
    const createdUser = this.UserRepository.create(user);
    await this.UserRepository.save(createdUser);
    return createdUser;
  }

  async findByEmail(email: string) {
    return this.UserRepository.findOne({ where: { email } });
  }

  async getAllUsers() {
    return await this.UserRepository.find();
  }

  async removeUser(id: number) {
    const deletedUser = await this.UserRepository.findOne({ where: { id } });
    await this.UserRepository.delete(deletedUser);
    return deletedUser;
  }

  async updateUser(id: number, user: updateUserDto) {
    const updateUser = await this.UserRepository.findOne({ where: { id } });
    Object.assign(updateUser, user);
    await this.UserRepository.save(updateUser);
    return updateUser;
  }
}
