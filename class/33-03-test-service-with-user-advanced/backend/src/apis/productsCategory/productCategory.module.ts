import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductCategory } from './entities/productCategory.entity';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductCategoryService } from './productCategory.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductCategory])],
  providers: [
    ProductCategoryResolver, //
    ProductCategoryService,
  ],
})
export class ProductCategoryModule {}
