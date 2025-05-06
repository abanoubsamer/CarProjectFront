import { environment } from '../../environments/environment';

export class Routing {
  static Ip = environment.Ip;
  static Root = '/Api/';
  static Version = 'V1/';
  static Role = Routing.Ip + Routing.Root + Routing.Version;

  static Product = {
    AddProduct: Routing.Role + 'Product/Add',
    UpdateProduct: Routing.Role + 'Product/Update',
    GetProductPagination: Routing.Role + 'Product/Pagination',
    GetProductDetails: Routing.Role + 'Product/{Id}',
  };

  static Authentication = {
    LoginUser: Routing.Role + 'Auth/Login',
    RegisterUser: Routing.Role + 'Auth/Register/User',
  };

  static Car = {
    GetCarBrandsWithPagination: Routing.Role + 'CarBrand/Pagination',
  };

  static Category = {
    GetCategoryPagination: Routing.Role + 'Category/Pagination',
    GetCategoryById: Routing.Role + 'Category/{Id}',
  };

  static User = {
    GetUserById: Routing.Role + 'User/{Id}',
    UpdateUser: Routing.Role + 'User/update',
    AddPhones: Routing.Role + 'User/AddPhones',
    GetPhones: Routing.Role + 'User/GetPhones/{Id}',
    AddShippingAddresses: Routing.Role + 'User/AddShippingAddresses',
    GetShippingAddresses: Routing.Role + 'User/ShippingAddresses/{Id}',
  };

  static Model = {
    GetModelsWithBarnd: Routing.Role + 'Model/GetModelWithBrand/{Id}',
    GetModelById: Routing.Role + 'Model/GetModelById/{Id}',
  };

  static Cart = {
    GetCart: Routing.Role + 'card/{Id}',
    AddToCart: Routing.Role + 'UserCard/Add',
    UpdateItem: Routing.Role + 'UserCard/Update',
    RemoveItem: Routing.Role + 'UserCard/{Id}',
  };

  static Review = {
    GetReviewStatistic: Routing.Role + 'Review/GetRatingStatistics/{Id}',
  };

  static Chat = {
    Prefix: Routing.Role + 'Chat/',
    SendMassage: Routing.Role + 'Chat/SendMassage',
    NewChat: Routing.Role + 'Chat/NewChat/{Id}',
  };
  static Payment = {
    Prefix: Routing.Role + 'Payment/',
    GetUrlpayment: Routing.Role + 'Payment/GetUrlpayment',
  };

  static Order = {
    GetUserOrder: Routing.Role + 'Order/UserOrders/{id}',
    AddUserOrder: Routing.Role + 'Order/AddTest',
  };
}
