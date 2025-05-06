import { StatusEnum } from '../../../../Core/Enums/statusEnum';

export interface UpdateStatsOrder {
  productID: string;
  orderId: string;
  status: StatusEnum;
}
