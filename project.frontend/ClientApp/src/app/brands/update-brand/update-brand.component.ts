import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  brandForm!: FormGroup;

  ngOnInit() {
    
    //FUNZIONE PER RICAVARE L'ID DALL'URL ATTUALE
    this._Activatedroute.paramMap.subscribe(params => {
      this.brandId = Number(params.get("brandId"));

      //FINDBYID PER RICAVARE I DATI DELL'OGGETTO IN QUESTIONE
      //DA RIPROPORRE IN PAGINA
      this.brandService.FindByIdAsync(this.brandId)
        .subscribe((response) => {

          //BUILDER DEL FORM
          this.brandForm = this.formBuilder.group({
            brandId: [this.brandId],
            brandName: [response.brandName]
          })
        });
    })
  }

  loading: boolean = false;
  errorMessage!: string;

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.brandForm.value);
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }

}
