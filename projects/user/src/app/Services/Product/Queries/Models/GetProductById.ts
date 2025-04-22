import { ProductImagesDto } from "../../../../Core/Dtos/ProductImagesDto";
import { SellerDto } from "../../../../Core/Dtos/SellerDto";

export interface GetProductById {
  reviewDto: string
  productID: string;
  name: string;
  description: string;
  averageRating: number;
  price: number;
  stockQuantity: number;
  seller:  SellerDto;
  images: ProductImagesDto[];
}