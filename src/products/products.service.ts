import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Product, ProductStatus } from './entities/products.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private ProductRepo: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
    const product = new Product(createProductDto);
    if (product) {
      product.status === ProductStatus.Active;
    }
    return this.ProductRepo.save(product);
  }

  findAll() {
    return this.ProductRepo.find();
  }

//   async findOne(id: string) {
//     try {
//       const product = await this.ProductRepo.findOneOrFail({ where: { id } });
//       return product;
//     } catch (error) {
//       return error;
//     }
//   }

//   async update(id: string, updateProjectDto: UpdateProductDto) {
//     const project = await this.ProductRepo.findOneOrFail({ where: { id } });
//     updateProjectDto.name && (project.name = updateProjectDto.name);
//     updateProjectDto.description &&
//       (project.description = updateProjectDto.description);

//     this.ProductRepo.save(project);
//   }

//   async remove(id: string) {
//     const project = await this.ProductRepo.findOneOrFail({ where: { id } });
//     await this.ProductRepo.remove(project);
//     return `This action removes a #${id} project`;
//   }
}
