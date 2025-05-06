import { environment } from '../../environments/environment';

export class Routing {
  static Ip = environment.Ip;
  static SingelId = '{Id}';
  static SingelName = '{Name}';
  static SingelEmail = '{email}';
  static Root = 'Api';
  static Version = 'V1';
  static Role = Routing.Ip + '/' + Routing.Root + '/' + Routing.Version + '/';

  static Seller = {
    Prefix: Routing.Role + 'Seller/',
    GetSellers: Routing.Role + 'Seller/GetSellers',
    GetSellersById: Routing.Role + 'Seller/{Id}',
    GetSellersProducts: Routing.Role + 'Seller/GetSellersProducts',
    SellerEamilIsExist: Routing.Role + 'Seller/SellerEamilIsExist',
  };

  static Mail = {
    Prefix: Routing.Role + 'Mail/',
    SendOtp: Routing.Role + 'Mail/SendOtp',
    VerifyOtp: Routing.Role + 'Mail/VerifyOtp',
  };

  static Notification = {
    Prefix: Routing.Role + 'Notification/',
    SetNotificationTokenTopic:
      Routing.Role + 'Notification/SetNotificationTokenTopic',
    SetTokenNotificationToUser:
      Routing.Role + 'Notification/SetTokenNotificationToUser',
    SendNotificationTopic: Routing.Role + 'Notification/SendNotificationTopic',
    SendNotificationToUser:
      Routing.Role + 'Notification/SendNotificationToUser',
  };

  static Authentication = {
    RegisterSeller: Routing.Role + 'Auth/Register/Seller',
    LoginSeller: Routing.Role + 'Auth/LoginSeller',

    EmailExist: Routing.Role + 'Auth/EmailExist/{Email}',
    UserNameExist: Routing.Role + 'Auth/UserNameExist/{Name}',
  };
  static Orders ={
    GetSellerOrdersPagination : Routing.Role + 'Order/SellerOrders',
    };
}
