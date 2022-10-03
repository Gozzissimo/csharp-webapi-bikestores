import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-show-product',
  templateUrl: './show-product.component.html',
  styleUrls: ['./show-product.component.css']
})
export class ShowProductComponent implements OnInit {
  productId!: number;
  actualProduct!: Product;
  isLoading: boolean = true;
  id: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    //SUBSCRIBE PER RICHIAMARE L'ID DALL'URL
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = Number(params.get("productId"));
      this.productService
        .FindByIdAsync(this.productId)
        .pipe(
          map(
            (res) => this.actualProduct = res)
        )
        .subscribe(
          (response) => (this.responseReceived(response)))
    });
  }

  private responseReceived(res: Product) {
    this.isLoading = false;
    this.actualProduct = res;
  }

  //FUNZIONE DELETE
  loading: boolean = false;
  errorMessage!: string;

  public DeleteAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";
    if (confirm("Are you sure do you want to delete this Product?")) {
      this.productService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/products']);
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
  }
}
