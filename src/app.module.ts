import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProjectsModule } from './projects/projects.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects/entities/project.entity';
import { ProductsModule } from './products/products.module';
import { Product } from './products/entities/products.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mongodb',
        url: configService.get<string>('MONGO_URI'),
        entities: [Product, Project],
      }),
      inject: [ConfigService],
    }),
    ProductsModule,
    ProjectsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// @Module({
//   imports: [
//     TypeOrmModule.forRoot({
//       type: 'sqlite',
//       database: ':memory',
//       synchronize: true,
//       entities: [Project, Product],
//     }),
//     ProjectsModule,
//     ProductsModule,
//   ],
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {}
