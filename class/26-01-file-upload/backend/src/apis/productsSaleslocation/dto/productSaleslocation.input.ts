import { InputType, OmitType } from '@nestjs/graphql';
import { ProductSaleslocation } from '../entities/productSaleslocation.entity';

@InputType()
export class ProductSaleslocationInput extends OmitType(
  ProductSaleslocation,
  ['id'],
  InputType,
) {
  // @Field(() => String)
  // address: string;
  //
  // @Field(() => String)
  // addressDetail: string;
  //
  // @Field(() => Float)
  // lat: number;
  //
  // @Field(() => Float)
  // lng: number;
  //
  // @Field(() => Date)
  // meetingTime: Date; // => 이것처럼 모두 적어야 하지만, PickType 또는 OmitType 등을 활용하여 타입을 재사용
  //
  //   myColumn: String;
}
