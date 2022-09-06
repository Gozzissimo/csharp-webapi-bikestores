import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from '../../dto/brand.model';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-show-brand',
  templateUrl: './show-brand.component.html',
  styleUrls: ['./show-brand.component.css']
})
export class ShowBrandComponent implements OnInit {
  brandId!: number;
  actualBrand!: Brand;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private brandService: BrandService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //SUBSCRIBE PER RICHIAMARE L'ID DALL'URL
    this._Activatedroute.paramMap.subscribe(params => {
      this.brandId = Number(params.get("brandId"));

      //RICERCA DEL BRAND CON L'ID CORRETTO
      this.brandService
        .FindByIdAsync(this.brandId)
        .subscribe((s) => (this.actualBrand = s));
    });
  }

  //FUNZIONE DELETE
  loading: boolean = false;
  errorMessage!: string;

  public DeleteAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
