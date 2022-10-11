export interface Order {
  orderId: number;
  customerId: number;
  orderStatus: number;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  storeId: number;
  staffID: number;
}
