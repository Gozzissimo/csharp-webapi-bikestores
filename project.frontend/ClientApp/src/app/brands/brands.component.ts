import { Component, OnInit } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../dto/Brand.interface'



@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  providers: [BrandService]
})
export class BrandsComponent implements OnInit {

  title = 'Brands';
  brands!: Brand[];
  brandById!: Brand;

  loading: boolean = false;
  errorMessage!: string;

  constructor(private brandService: BrandService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.brandService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          //console.log('OK')
          this.brands = response;
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

  public FindByIdAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";

    this.brandService.FindByIdAsync(id)
      .subscribe(
        (response) => {                           //next() callback
          if (this.brands) {
            this.brands = [];
            this.brands.push(response);
          }
          else {
            let arr = [];
            arr.push(response);
            this.brands = arr;
          }
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

  ngOnInit(): void {
    /*this.GetAsync();*/
  }

}
