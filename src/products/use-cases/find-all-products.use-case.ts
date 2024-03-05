import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from '../product.repository';

@Injectable()
export class FindAllProductsUseCase {
  constructor(
    @Inject('IProductRepository')
    private readonly productRepo: IProductRepository, //Repository em memoria
  ) {}

  async execute() {
    return this.productRepo.findAll();
  }
}
