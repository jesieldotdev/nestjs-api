import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { CreateProductUseCase } from './use-cases/create-product.use-case';
import { FindAllProductsUseCase } from './use-cases/find-all-products.use-case';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly findAllProductsUseCase: FindAllProductsUseCase,
    // private readonly startProjectUseCase: StartProjectUseCase,
    // private readonly findOneProjectUseCase: FindOneProjectUseCase,
    // private readonly removeProjectUseCase: RemoveProjectUseCase,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.createProductUseCase.execute(createProductDto);
  }
  @Get()
  findAll() {
    return this.findAllProductsUseCase.execute();
  }

  //   @Get(':id')
  //   findOne(@Param('id') id: string) {
  //     return this.findOneProjectUseCase.execute(id);
  //   }
  //   @Patch(':id')
  //   update(@Param('id') id: string, @Body() updateProjectDto: UpdateProjectDto) {
  //     return this.startProjectUseCase.execute(id, updateProjectDto);
  //   }
  //   @Delete(':id')
  //   remove(@Param('id') id: string) {
  //     return this.removeProjectUseCase.execute(id);
  //   }
}
