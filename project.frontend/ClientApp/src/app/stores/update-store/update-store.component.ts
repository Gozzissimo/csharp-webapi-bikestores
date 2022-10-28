import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Store } from '../../dto/Store.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-update-store',
  templateUrl: './update-store.component.html',
  styleUrls: ['./update-store.component.css']
})
export class UpdateStoreComponent implements OnInit {

  public storeId!: number;
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(
    private storeService: StoreService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  //BUILDER DEL FORM
  storeForm: FormGroup = this.formBuilder.group({
    storeName: [null],
    phone: [null],
    email: [null],
    street: [null],
    city: [null],
    state: [null],
    zipCode: [null],
  }); 


  //RECALL DEI DATI USANDO IL PARAM URL
  GetDataByParam() {
    concat(
      this.storeId = this._Activatedroute.snapshot.params["storeId"],
      of(this.storeService
        .FindByIdAsync(this.storeId)
        .subscribe(
          (res) => {
            const {
              storeName,
              phone,
              email,
              street,
              city,
              state,
              zipCode
            } = res;
            this.storeForm.patchValue({
              storeName,
              phone,
              email,
              street,
              city,
              state,
              zipCode
            });
          }
        ))
    )
  }

  ngOnInit() {
    this.GetDataByParam()
  }

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.storeService.UpdateAsync(<Store>this.storeForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/stores']);
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
