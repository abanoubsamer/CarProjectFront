import { orderStatusDto } from "../../../Core/Dtos/orderStatusDto";
import { productDto } from "../../../Core/Dtos/productDto";
import { shippingAddressDto } from "../../../Core/Dtos/shippingAddressDto";
import { userDto } from "../../../Core/Dtos/userDto";

export interface GetOrderSeller {
    orderID: string,
    orderDate: string,
    totalAmount: number,
    user: userDto,
    status: orderStatusDto;
    product:productDto,
    quantity: number,
    price: number,
    phoneNumber: string,
    shippingAddresses: shippingAddressDto
        
}