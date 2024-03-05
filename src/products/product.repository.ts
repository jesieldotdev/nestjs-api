import { Repository } from 'typeorm';
import { Product } from './entities/products.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

export interface IProductRepository {
  create(product: Product): Promise<void>;
  update(product: Product): Promise<void>;
  remove(id: string): Promise<void>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product>;
}

@Injectable()
export class ProductTypeOrmRepository implements IProductRepository {
  constructor(
    @InjectRepository(Product)
    private typeOrmRepo: Repository<Product>,
  ) {}

  async create(product: Product): Promise<void> {
    await this.typeOrmRepo.save(product);
  }

  async update(product: Product): Promise<void> {
    await this.typeOrmRepo.update(product.id, product);
  }
  async remove(id: string): Promise<void> {
    await this.typeOrmRepo.delete(id);
  }

  findAll(): Promise<Product[]> {
    return this.typeOrmRepo.find();
  }
  findById(id: string): Promise<Product> {
    return this.typeOrmRepo.findOneOrFail({ where: { id } });
  }
}
