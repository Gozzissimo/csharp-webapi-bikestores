import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { BrandsComponent } from './brands/brands.component';
import { CreateBrandComponent } from './brands/create-brand/create-brand.component';
import { UpdateBrandComponent } from './brands/update-brand/update-brand.component';
import { ShowBrandComponent } from './brands/show-brand/show-brand.component';
import { DeleteBrandComponent } from './brands/delete-brand/delete-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    BrandsComponent,
    CreateBrandComponent,
    UpdateBrandComponent,
    ShowBrandComponent,
    DeleteBrandComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'brands', component: BrandsComponent },
      { path: 'brands/new', component: CreateBrandComponent },
      { path: 'brands/show/:brandId', component: ShowBrandComponent },
      { path: 'brands/edit/:brandId', component: UpdateBrandComponent },
      { path: 'brands/delete/:brandId', component: DeleteBrandComponent },
    ]),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
