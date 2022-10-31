import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
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

  constructor(
    private _Activatedroute: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {
  }

  GetDataByParam() {
    concat(
      this.productId = this._Activatedroute.snapshot.params["productId"],
      of(this.productService
        .FindByIdAsync(this.productId)
        .subscribe(
          (res) => {
            this.actualProduct = res
            this.isLoading = false
          }
        ))
    )
  }

  ngOnInit(): void {
    this.GetDataByParam()
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
