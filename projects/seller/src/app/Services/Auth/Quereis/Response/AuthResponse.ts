export interface AuthResponse {
  token: string;
  expiration: Date;
  username: string;
  userID: string;
  sellerID: string;
  roles: string[];
}
