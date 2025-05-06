import { ProductDto } from '../../../../Core/Dtos/ProductDto';
import { ShippingAddressesDto } from '../../../../Core/Dtos/ShippingAddressesDto';
import { UserDtos } from '../../../../Core/Dtos/UserDtos';
import { StatusEnum } from '../../../../Core/Enums/statusEnum';

export interface GetSellerOrders {
  orderID: string;
  user: UserDtos;
  orderDate: string;
  product: ProductDto;
  phoneNumber: string;
  quantity: number;
  price: number;
  totalAmount: number;
  status: StatusEnum;
  shippingAddresses: ShippingAddressesDto;
}
