interface IPhone {
  area_code: string;
  number: string;
}
interface IIdentification {
  type: string;
  number: string;
}
interface IAddress {
  street_name: string;
  street_number: string;
  zip_code: string;
}
interface IUser {
  name: string;
  surname: string;
  email: string;
  photoUrl: string;
  phone: IPhone;
  identification: IIdentification;
  address: IAddress;
}
interface IOrderDetail {
  productId: string;
  quantity: number;
}
interface IOrder {
  detail: IOrderDetail[];
}
export interface IState {
  businessId: string;
  user: IUser;
  userId: string;
  order: IOrder;
}
