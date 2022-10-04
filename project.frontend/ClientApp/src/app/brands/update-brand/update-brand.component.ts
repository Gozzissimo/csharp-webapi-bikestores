import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';

@Component({
  selector: 'app-update-brand',
  templateUrl: './update-brand.component.html',
  styleUrls: ['./update-brand.component.css'],
})

export class UpdateBrandComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  brandId!: number;
  brandForm: FormGroup =
    this.formBuilder.group({
      brandId: [null],
      brandName: [null]
    });

  GetDataByParam() {
    concat(
      this.brandId = this._Activatedroute.snapshot.params["brandId"],
      of(this.brandService
        .FindByIdAsync(this.brandId)
        .subscribe(
          (res) => {
            const { brandId, brandName } = res;
            this.brandForm.patchValue({
              brandId,
              brandName
            });
          }
        ))
    )
  }

  ngOnInit() {
    this.GetDataByParam()
  }

    //FUNZIONE PER AGGIORNARE L'OGGETTO
  loading: boolean = false;
  errorMessage!: string;

  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.brandService.UpdateAsync(<Brand>this.brandForm.value)
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
