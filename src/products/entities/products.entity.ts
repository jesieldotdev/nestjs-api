import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProductStatus {
  Inactive = 'inactive',
  Active = 'active',
}

@Entity()
export class Product {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  price: number;
  status: ProductStatus = ProductStatus.Active;

  constructor(
    props: {
      name: string;
      description: string;
      price: number;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();
  }

  //regras de negocio
}
