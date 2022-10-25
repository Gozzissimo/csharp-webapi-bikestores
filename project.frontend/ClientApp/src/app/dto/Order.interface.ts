export interface Order {
  orderId: number;
  customerId: number;
  orderStatus: number;
  customerName: string;
  orderDate: Date;
  requiredDate: Date;
  shippedDate: Date;
  storeId: number;
  staffId: number;
  staffName: string;
}