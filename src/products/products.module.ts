import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/products.entity';
import {
  ProductTypeOrmRepository,
  IProductRepository,
} from './product.repository';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindAllProductsUseCase } from './use-cases/find-all-products.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    CreateProductUseCase,
    FindAllProductsUseCase,
    ProductTypeOrmRepository,
    {
      provide: 'IProductRepository',
      useExisting: ProductTypeOrmRepository,
    },
  ],
})
export class ProductsModule {}
