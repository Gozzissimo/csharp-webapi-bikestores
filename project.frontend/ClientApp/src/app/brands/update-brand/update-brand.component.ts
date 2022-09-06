import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from '../../dto/brand.model';
import { BrandService } from '../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { BrandsComponent } from '../brands.component';
import { Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css'],
  providers: [BrandService]
})
export class UpdateBrandComponent implements OnInit {
  brandId!: number;
  brand!: Brand;

  constructor(
    private brandService: BrandService,
    private _Activatedroute: ActivatedRoute,
    public fb: FormBuilder,
  ) { }

  brandForm!: FormGroup;

  ngOnInit() {
    this._Activatedroute.paramMap.subscribe(params => {
      this.brandId = Number(params.get("brandId"));
    })
  }

  getBrand() {
    this.brandService
      .FindByIdAsync(this.brandId)
      .subscribe((s) => (this.brand = s));
  }

  loading: boolean = false;
  errorMessage!: string;

  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.brandService.UpdateAsync(<Brand>this.brandForm.value)
      .subscribe(
        (response) => {                           //next() callback
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
