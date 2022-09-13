import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

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

//MATERIAL UI
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';

//SERVICES
import { ConfigService } from './services/config.service';
import { BrandService } from './services/brand.service';
import { StoreModule } from '@ngrx/store';
import { APP_INITIALIZER } from '@angular/core';

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

  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent},
      { path: 'brands', component: BrandsComponent },
      { path: 'brands/new', component: CreateBrandComponent },
      { path: 'brands/show/:brandId', component: ShowBrandComponent },
      { path: 'brands/edit/:brandId', component: UpdateBrandComponent },
      { path: 'brands/delete/:brandId', component: DeleteBrandComponent },
      //{ path: 'products', component: ProductsComponent },
      //{ path: 'products/new', component: CreateProductComponent },
      //{ path: 'products/show/:productId', component: ShowProductComponent },
      //{ path: 'products/edit/:productId', component: UpdateProductComponent },
      //{ path: 'products/delete/:productId', component: DeleteProductComponent },
    ]),
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: (configService: ConfigService) => () =>
      configService.load(),
    deps: [
      ConfigService
    ],
    multi: true
  },
    BrandService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
