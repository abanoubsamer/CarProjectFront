export interface AddProductModel {
  Name: string;
  Description: string;

  Price: number;
  FormImages: File[];
  StockQuantity: number;
  SellerID: string;
  CategoryID: string;
}
