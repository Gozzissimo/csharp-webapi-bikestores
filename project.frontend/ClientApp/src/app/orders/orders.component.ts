import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Order } from '../dto/Order.interface';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  private title = 'Orders';
  public orders!: Order[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private orderService: OrderService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.orderService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.orders = response;
          this.dataSource.data = this.orders;
        },
        (error) => {                              //error() callback
          console.error('Request failed with error')
          this.errorMessage = error;
          this.loading = false;
        },
        () => {                                   //complete() callback
          this.loading = false;
        })
  }

  ngOnInit(): void {
    this.GetAsync();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //SEZIONE MAT-TABLE
  public pageSizeOptions = [10, 25, 50]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Order>();

  displayedColumns = [
    'orderId',
    'customerName',
    'orderStatus',
    'orderDate',
    'requiredDate',
    'shippedDate',
    'storeName',
    'staffId'
    ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //FUNZIONE CHE MOSTRA LA ROW CLICCANDOLA
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

}
