import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderItem } from '../dto/OrderItem.interface';
import { OrderItemService } from '../services/order-item.service';

@Component({
  selector: 'app-order-items',
  templateUrl: './order-items.component.html',
  styleUrls: ['./order-items.component.css']
})
export class OrderItemsComponent implements OnInit {

  private title = 'Order-Items';
  public orderItems!: OrderItem[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private orderItemService: OrderItemService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.orderItemService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.orderItems = response;
          this.dataSource.data = this.orderItems;
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

  dataSource = new MatTableDataSource<OrderItem>();

  displayedColumns = [
    'orderId',
    'itemId',
    'productId',
    'productName',
    'quantity',
    'listPrice',
    'discount',
    'actions'
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
