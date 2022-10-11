import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../dto/Product.interface';
import { ProductService } from '../services/product.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  private title = 'Products';
  public products!: Product[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private productService: ProductService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.productService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.products = response;
          this.dataSource.data = this.products;
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

  dataSource = new MatTableDataSource<Product>();

  displayedColumns = [
    'productName',
    'categoryName',
    'brandName',
    'modelYear',
    'listPrice',
    'actions'];

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
