import { CategoryDto } from '../../../../Core/Dtos/CategoryDto';
import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { ReviewDto } from '../../../../Core/Dtos/ReviewDto';

export interface GetSellerProductsModel {
  id: string;
  name: string;
  descreption: string;
  subDescreption: string;
  price: number;
  stock: number;
  productImagesDto: ProductImagesDto[];
  avaragarate: number;
  category: CategoryDto;
}
