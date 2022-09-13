import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
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
  id: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private brandService: BrandService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    //SUBSCRIBE PER RICHIAMARE L'ID DALL'URL
    this._Activatedroute.paramMap.subscribe(params => {
      this.brandId = Number(params.get("brandId"));
      this.brandService
        .FindByIdAsync(this.brandId)
        .pipe(
          map(
            (res) => this.actualBrand = res)
        )
        .subscribe(
          (response) => (this.responseReceived(response)))
    });
  }

  private responseReceived(res: Brand) {
    this.isLoading = false;
    this.actualBrand = res;
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
