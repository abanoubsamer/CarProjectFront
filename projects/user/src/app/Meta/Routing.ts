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
  };
  static Model = {
    GetModelsWithBarnd: Routing.Role + 'Model/GetModelWithBrand/{Id}',
    GetModelById: Routing.Role + 'Model/GetModelById/{Id}',
  };
}
