import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { Product, ProductStatus } from '../entities/products.entity';
import { IProductRepository } from '../product.repository';

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepo: IProductRepository, //Repository em memoria
  ) {}

  async execute(input: CreateProductDto) {
    const product = new Product(input);

    if (input) {
      product.status = ProductStatus.Active;
    }
    // return this.projectRepo.save(project);
    await this.productRepo.create(product);
    return product;
  }
}
