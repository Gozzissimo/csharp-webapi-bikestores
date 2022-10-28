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

//ORDER-ITEMS
import { OrderItemsComponent } from './order-items/order-items.component';
import { CreateOrderItemComponent } from './order-items/create-order-item/create-order-item.component';
import { UpdateOrderItemComponent } from './order-items/update-order-item/update-order-item.component';
import { DeleteOrderItemComponent } from './order-items/delete-order-item/delete-order-item.component';
import { ShowOrderItemComponent } from './order-items/show-order-item/show-order-item.component';

//ORDERS
import { OrdersComponent } from './orders/orders.component';
import { CreateOrderComponent } from './orders/create-order/create-order.component';
import { UpdateOrderComponent } from './orders/update-order/update-order.component';
import { DeleteOrderComponent } from './orders/delete-order/delete-order.component';
import { ShowOrderComponent } from './orders/show-order/show-order.component';

//CUSTOMERS
import { CustomersComponent } from './customers/customers.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { UpdateCustomerComponent } from './customers/update-customer/update-customer.component';
import { DeleteCustomerComponent } from './customers/delete-customer/delete-customer.component';
import { ShowCustomerComponent } from './customers/show-customer/show-customer.component';


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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

//SERVICES
import { APP_INITIALIZER } from '@angular/core';
import { ConfigService } from './services/config.service';
import { BrandService } from './services/brand.service';
import { ProductService } from './services/product.service';
import { CategoryService } from './services/category.service';
import { OrderItemService } from './services/order-item.service';
import { OrderService } from './services/order.service';
import { CustomerService } from './services/customer.service';
import { MatNativeDateModule } from '@angular/material/core';

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
    DeleteCategoryComponent,
    OrderItemsComponent,
    CreateOrderItemComponent,
    UpdateOrderItemComponent,
    DeleteOrderItemComponent,
    ShowOrderItemComponent,
    OrdersComponent,
    CreateOrderComponent,
    UpdateOrderComponent,
    DeleteOrderComponent,
    ShowOrderComponent,
    CustomersComponent,
    CreateCustomerComponent,
    UpdateCustomerComponent,
    DeleteCustomerComponent,
    ShowCustomerComponent
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

      //ORDER-ITEMS
      { path: 'order-items', component: OrderItemsComponent },
      { path: 'order-items/new', component: CreateOrderItemComponent },
      { path: 'order-items/show/:orderItemsId', component: ShowOrderItemComponent },
      { path: 'order-items/edit/:orderItemsId', component: UpdateOrderItemComponent },
      { path: 'order-items/delete/:orderItemsId', component: DeleteOrderItemComponent },

      //ORDERS
      { path: 'orders', component: OrdersComponent },
      { path: 'orders/new', component: CreateOrderComponent },
      { path: 'orders/show/:orderId', component: ShowOrderComponent },
      { path: 'orders/edit/:orderId', component: UpdateOrderComponent },
      { path: 'orders/delete/:orderId', component: DeleteOrderComponent },

      //CUSTOMERS
      { path: 'customers', component: CustomersComponent },
      { path: 'customers/new', component: CreateCustomerComponent },
      { path: 'customers/show/:customerId', component: ShowCustomerComponent },
      { path: 'customers/edit/:customerId', component: UpdateCustomerComponent },
      { path: 'customers/delete/:customerId', component: DeleteCustomerComponent },
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
    MatDatepickerModule,
    MatNativeDateModule,
    MatAutocompleteModule
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
    CategoryService,
    OrderItemService,
    OrderService,
    CustomerService,
    MatNativeDateModule,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
