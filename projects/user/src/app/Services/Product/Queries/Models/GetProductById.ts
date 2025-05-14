import { ProductImagesDto } from '../../../../Core/Dtos/ProductImagesDto';
import { ReviewDto } from '../../../../Core/Dtos/ReviewDto';
import { SellerDto } from '../../../../Core/Dtos/SellerDto';

export interface GetProductById {
  reviewDto: ReviewDto[];
  productID: string;
  name: string;
  description: string;
  averageRating: number;
  price: number;
  stockQuantity: number;
  seller: SellerDto;
  images: ProductImagesDto[];
}
