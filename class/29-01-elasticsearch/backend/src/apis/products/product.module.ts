import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { ProductTag } from '../productsTag/entities/productTag.entity';
import { Product } from './entities/product.entity';
import { ProductSubscriber } from './entities/product.subscriber';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product, //
      ProductSaleslocation,
      ProductTag,
    ]),
    ElasticsearchModule.register({
      node: 'http://elastic.codebootcamp.co.kr:9200',
    }),
  ],
  providers: [
    ProductResolver, //
    ProductService,
    ProductSubscriber,
  ],
})
export class ProductModule {}
