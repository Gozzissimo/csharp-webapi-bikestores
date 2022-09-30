import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../dto/Brand.interface';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

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
    private router: Router,
    public formBuilder: FormBuilder
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

  productForm!: FormGroup;

  ngOnInit() {

    //RECALL DEI DATI PER BRAND
    this.GetBrands();

    //BUILDER DEL FORM
    this.productForm = this.formBuilder.group({
      productName: [''],
      modelYear: [''],
      listPrice: [''],
      brandId: this.brands,
      categoryId: this.categories
    })
  }

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.productForm.value);
    this.productService.CreateAsync(<Product>this.productForm.value)
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
