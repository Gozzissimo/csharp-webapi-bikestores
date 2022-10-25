import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';
import { Category } from '../../dto/Category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})

export class UpdateProductComponent implements OnInit {

  public productId!: number;
  public loading: boolean = false;
  public errorMessage!: string;
  public brands!: Brand[];
  public categories!: Category[];

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  //BUILDER DEL FORM
  productForm: FormGroup = this.formBuilder.group({
    brandId: [null],
    categoryId: [null],
    productName: [null],
    modelYear: [null],
    listPrice: [null],
    productId: [null]
  });


  //RECALL DEI DATI PER BRAND
  public GetBrands() {
    this.loading = true;
    this.errorMessage = "";
    this.brandService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.brands = response;
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

  //RECALL DEI DATI PER CATEGORY
  public GetCategories() {
    this.loading = true;
    this.errorMessage = "";
    this.categoryService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.categories = response;
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

  //RECALL DEI DATI USANDO IL PARAM URL
  GetDataByParam() {
    concat(
      this.productId = this._Activatedroute.snapshot.params["productId"],
      of(this.productService
        .FindByIdAsync(this.productId)
        .subscribe(
          (res) => {
            const {
              productName,
              brandName,
              categoryName,
              modelYear,
              listPrice,
              brandId,
              categoryId
            } = res;
            this.productForm.patchValue({
              productName,
              brandName,
              categoryName,
              modelYear,
              listPrice,
              brandId,
              categoryId
            });
          }
        ))
    )
  }

  ngOnInit() {
    this.GetBrands();
    this.GetCategories();
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
