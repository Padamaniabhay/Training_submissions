import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/entity/user.entity";
import { In, Repository } from "typeorm";
import { createProductDto } from "./dtos/create-product.dto";
import { Product } from "../../entity/product.entity";

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async createProduct(product: createProductDto, user: User) {
    const newProduct = this.productRepository.create(product);
    newProduct.user = user;
    this.productRepository.save(newProduct);

    return { ...product, user: user.id };
  }

  async findByIds(ids: number[]) {
    return await this.productRepository.findBy({ id: In(ids) });
  }
}
