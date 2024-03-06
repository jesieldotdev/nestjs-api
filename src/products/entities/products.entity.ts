import { Column, Entity, ObjectIdColumn, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProductStatus {
  Inactive = 'inactive',
  Active = 'active',
}

@Entity()
export class Product {
  @ObjectIdColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({
    type: 'enum',
    enum: ProductStatus,
    default: ProductStatus.Active,
  })
  status: ProductStatus;

  constructor(props: { name: string; description: string; price: number }) {
    Object.assign(this, props);
  }

  //regras de negocio
}
