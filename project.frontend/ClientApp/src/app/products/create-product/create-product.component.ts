import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';
import { BrandService } from '../../services/brand.service';
import { Brand } from '../../dto/Brand.interface';
import { Category } from '../../dto/Category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  public loading: boolean = false;
  public errorMessage!: string;
  public brands!: Brand[];
  public categories!: Category[];

  //BUILDER DEL FORM
  productForm: FormGroup = this.formBuilder.group({
    productName: [''],
    modelYear: [''],
    listPrice: [''],
    brandId: this.brands,
    categoryId: this.categories
  })

  constructor(
    private productService: ProductService,
    private brandService: BrandService,
    private categoryService: CategoryService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

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

  //RECALL DEI DATI PER BRAND
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

  ngOnInit() {
    this.GetBrands();
    this.GetCategories();
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
