import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilterBrand, FilterProduct } from './Utilities/filter.pipe';

//HOME AND NAV
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';

//BRAND
import { BrandsComponent } from './brands/brands.component';
import { CreateBrandComponent } from './brands/create-brand/create-brand.component';
import { UpdateBrandComponent } from './brands/update-brand/update-brand.component';
import { ShowBrandComponent } from './brands/show-brand/show-brand.component';
import { DeleteBrandComponent } from './brands/delete-brand/delete-brand.component';

//PRODUCT
import { ProductsComponent } from './products/products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { DeleteProductComponent } from './products/delete-product/delete-product.component';
import { ShowProductComponent } from './products/show-product/show-product.component';
import { UpdateProductComponent } from './products/update-product/update-product.component';

//CATEGORIES
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './categories/create-category/create-category.component';
import { UpdateCategoryComponent } from './categories/update-category/update-category.component';
import { ShowCategoryComponent } from './categories/show-category/show-category.component';
import { DeleteCategoryComponent } from './categories/delete-category/delete-category.component';

//MATERIAL UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSelectModule } from '@angular/material/select';

//SERVICES
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';
import { BrandService } from './services/brand.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BrandsComponent,
    CreateBrandComponent,
    UpdateBrandComponent,
    ShowBrandComponent,
    DeleteBrandComponent,
    ProductsComponent,
    CreateProductComponent,
    DeleteProductComponent,
    ShowProductComponent,
    UpdateProductComponent,
    FilterBrand,
    FilterProduct,
    CategoriesComponent,
    CreateCategoryComponent,
    UpdateCategoryComponent,
    ShowCategoryComponent,
    DeleteCategoryComponent
  ],

  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      //HOME
      { path: '', component: HomeComponent },

      //BRANDS
      { path: 'brands', component: BrandsComponent },
      { path: 'brands/new', component: CreateBrandComponent },
      { path: 'brands/show/:brandId', component: ShowBrandComponent },
      { path: 'brands/edit/:brandId', component: UpdateBrandComponent },
      { path: 'brands/delete/:brandId', component: DeleteBrandComponent },

      //PRODUCTS
      { path: 'products', component: ProductsComponent },
      { path: 'products/new', component: CreateProductComponent },
      { path: 'products/show/:productId', component: ShowProductComponent },
      { path: 'products/edit/:productId', component: UpdateProductComponent },
      { path: 'products/delete/:productId', component: DeleteProductComponent },

      //CATEGORIES
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/new', component: CreateCategoryComponent },
      { path: 'categories/show/:categoryId', component: ShowCategoryComponent },
      { path: 'categories/edit/:categoryId', component: UpdateCategoryComponent },
      { path: 'categories/delete/:categoryId', component: DeleteCategoryComponent },
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatProgressBarModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () =>
      configService.loadSettings(),
    deps: [
      ConfigService
    ],
    multi: true
  },
    BrandService,
    ProductService,
    CategoryService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
