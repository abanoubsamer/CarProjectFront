export interface AddProductModel {
  Name: string;
  Description: string;
  sKU: string;
  Price: number;
  FormImages: File[];
  MainImage: File;
  StockQuantity: number;
  SellerID: string;
  CategoryID: string;
}
