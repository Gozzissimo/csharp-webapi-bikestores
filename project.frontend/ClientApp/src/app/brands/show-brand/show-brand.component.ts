import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css']
})
export class ShowBrandComponent implements OnInit {
  brandId!: number;
  actualBrand!: Brand;
  isLoading: boolean = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private brandService: BrandService,
    private router: Router
  ) { }

  GetDataByParam() {
    concat(
      this.brandId = this._Activatedroute.snapshot.params["brandId"],
      of(this.brandService
        .FindByIdAsync(this.brandId)
        .subscribe(
          (res) => {
            this.actualBrand = res
            this.isLoading = false
          }
        ))
    )
  }

  ngOnInit(): void {
    this.GetDataByParam()
  }

  //FUNZIONE DELETE
  loading: boolean = false;
  errorMessage!: string;

  public DeleteAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";
    if (confirm("Are you sure do you want to delete this Brand?")) {
      this.brandService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/brands']);
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
}
