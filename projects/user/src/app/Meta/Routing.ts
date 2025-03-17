export class Routing {
  static Ip = 'https://17b2-197-55-39-142.ngrok-free.app/';
  static Root = 'Api/';
  static Version = 'V1/';
  static Role = Routing.Ip + Routing.Root + Routing.Version;

  static Product = {
    AddProduct: Routing.Role + 'Product/Add',
    UpdateProduct: Routing.Role + 'Product/Update',
    GetProductPagination: Routing.Role + 'Product/Pagination',
  };
  static Authentication = {
    LoginUser: Routing.Role + 'Auth/Login',
    RegisterUser: Routing.Role + 'Auth/Register/User',
  };

  static User = {
    GetUserById: Routing.Role + 'User/{Id}',
  };
}
