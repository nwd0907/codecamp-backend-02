import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateProductInput } from './dto/createProduct.input';
import { UpdateProductInput } from './dto/updateProduct.input';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

@Resolver()
export class ProductResolver {
  constructor(
    private readonly productService: ProductService, //

    private readonly elasticsearchService: ElasticsearchService,
  ) {}

  @Query(() => [Product])
  async fetchProducts(
    @Args({ name: "search", nullable: true }) search: string
  ) {
    // 엘라스틱서치에서 조회 연습하기!!
    const result = await this.elasticsearchService.search({
      index: 'myproduct0222',
      query: {
        match: {
          description: search
        }
      }
    });
    console.log(JSON.stringify(result, null, '  '));

    // 엘라스틱서치에서 조회해보기위해 임시로 주석!!
    // return this.productService.findAll();
  }

  @Query(() => Product)
  fetchProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.findOne({ productId });
  }

  @Mutation(() => Product)
  createProduct(
    @Args('createProductInput') createProductInput: CreateProductInput,
  ) {
    // 엘라스틱서치에서 등록 연습하기!! => 연습일뿐, 실제로는 MySQL에 저장할 예정!!
    // this.elasticsearchService.create({
    //   id: 'myid',
    //   index: 'myproduct',
    //   document: {
    //     name: '철수',
    //     age: 13,
    //     school: '다람쥐초등학교',
    //   },
    // });

    // 엘라스틱서치에서 등록해보기위해 임시로 주석!!
    return this.productService.create({ createProductInput });
  }

  @Mutation(() => Product)
  async updateProduct(
    @Args('productId') productId: string,
    @Args('updateProductInput') updateProductInput: UpdateProductInput,
  ) {
    // 판매 완료가 되었는지 확인해보기
    await this.productService.checkSoldout({ productId });

    // 수정하기
    return await this.productService.update({ productId, updateProductInput });
  }

  @Mutation(() => Boolean)
  deleteProduct(
    @Args('productId') productId: string, //
  ) {
    return this.productService.delete({ productId });
  }
}
