export class Routing {
  static Ip = 'https://localhost:7154/';
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
}
