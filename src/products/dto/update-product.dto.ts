import { PartialType } from '@nestjs/mapped-types';

class _UpdateProductDTO {
  name: string;
  description: string;
  price: number;
}

export class UpdateProductDto extends PartialType(_UpdateProductDTO) {}
