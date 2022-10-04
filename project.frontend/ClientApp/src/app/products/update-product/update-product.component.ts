import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {

  productId!: number;

  productForm: FormGroup =
    this.formBuilder.group({
      productId: [null],
      productName: [null],
      brandName: [null],
      categoryName: [null],
      modelYear: [null],
      listPrice: [null],
    });

  public loading: boolean = false;
  public errorMessage!: string;
  public brands!: Brand[];
  public categories: any[] =
    [
      {
        "categoryId": 1, "categoryName": "Children Bicycles"
      },
      {
        "categoryId": 2, "categoryName": "Comfort Bicycles"
      }
    ];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  public GetBrands() {
    this.loading = true;
    this.errorMessage = "";
    this.brandService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.brands = response;
          console.log(this.brands);
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

  GetDataByParam() {
    concat(
      this.productId = this._Activatedroute.snapshot.params["productId"],
      of(this.productService
        .FindByIdAsync(this.productId)
        .subscribe(
          (res) => {
            const { productId, productName, brandName, categoryName, modelYear, listPrice } = res;
            this.productForm.patchValue({
              productId,
              productName,
              brandName,
              categoryName,
              modelYear,
              listPrice
            });
          }
        ))
    )
  }

  ngOnInit() {
    //RECALL DEI DATI PER BRAND
    this.GetBrands();

    //RECALL DEI DATI USANDO IL PARAM
    this.GetDataByParam()
  }

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.productService.UpdateAsync(<Product>this.productForm.value)
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
