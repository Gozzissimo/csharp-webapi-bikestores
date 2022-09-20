import { Component, OnInit } from '@angular/core';
import { Product } from '../dto/Product.interface';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [ProductService]
})
export class ProductsComponent implements OnInit {

  private title = 'Product';
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

}
