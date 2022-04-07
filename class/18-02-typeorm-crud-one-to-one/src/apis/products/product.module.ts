import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductSaleslocation])],
  providers: [
    ProductResolver, //
    ProductService,
  ],
})
export class ProductModule {}
