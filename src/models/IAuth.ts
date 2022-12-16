export interface IAuthItems {
  name?: string;
  email: string;
  password?: string;
  key: string;
  secret: string;
  id?: number;
}
export interface IAuthState {
  data: IAuthItems;
}
