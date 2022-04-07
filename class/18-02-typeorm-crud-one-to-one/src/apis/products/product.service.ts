import {
  HttpException,
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductSaleslocation } from '../productsSaleslocation/entities/productSaleslocation.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(ProductSaleslocation)
    private readonly productSaleslocationRepository: Repository<ProductSaleslocation>,
  ) {}

  async findAll() {
    return await this.productRepository.find();
  }

  async findOne({ productId }) {
    return await this.productRepository.findOne({ where: { id: productId } });
  }

  async create({ createProductInput }) {
    // // 1. 상품만 등록하는 경우
    // // 상품을 데이터베이스에 저장
    // const result = await this.productRepository.save({
    //   ...createProductInput,

    //   // 하나하나 직접 나열하기
    //   // name: createProductInput.name,
    //   // description: createProductInput.description,
    //   // price: createProductInput.price,
    //  productSaleslocation: createProductInput.productSaleslocation
    // });
    // console.log(result);

    //
    //
    // 2. 상품과 상품거래위치를 같이 등록하는 경우
    const { productSaleslocation, ...product } = createProductInput;

    const result = await this.productSaleslocationRepository.save({
      ...productSaleslocation,
    });

    return await this.productRepository.save({
      ...product,
      productSaleslocation: result,
    });
  }

  async update({ productId, updateProductInput }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });

    const newProduct = {
      ...product,
      ...updateProductInput,

      // id: product.id,
      // name: product.name,
      // description: product.description,
      // price: product.price,
      // isSoldout: product.isSoldout,

      // description: updateProductInput.description
      // price: updateProductInput.price
    };

    return await this.productRepository.save(newProduct);
  }

  async checkSoldout({ productId }) {
    const product = await this.productRepository.findOne({
      where: { id: productId },
    });
    if (product.isSoldout)
      throw new UnprocessableEntityException('이미 판매 완료된 상품입니다.');

    // if (product.isSoldout) {
    //   throw new HttpException(
    //     '이미 판매 완료된 상품입니다.',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // }
  }

  async delete({ productId }) {
    // // 1. 실제 삭제
    // const result = await this.productRepository.delete({ id: productId });
    // return result.affected ? true : false;

    // // 2. 소프트 삭제(직접 구현) - isDeleted
    // this.productRepository.update({ id: productId }, { isDeleted: true });

    // // 3. 소프트 삭제(직접 구현) - deletedAt
    // this.productRepository.update({ id: productId }, { deletedAt: new Date() });

    // // 4. 소프트 삭제(TypeORM 제공) - softRemove
    // this.productRepository.softRemove({ id: productId }); // id로만 삭제 가능

    // 5. 소프트 삭제(TypeORM 제공) - softDelete
    const result = await this.productRepository.softDelete({ id: productId }); // 다양한 조건으로 삭제 가능!!
    return result.affected ? true : false;
  }
}
