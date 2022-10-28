import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '../../dto/Store.interface';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-create-store',
  templateUrl: './create-store.component.html',
  styleUrls: ['./create-store.component.css']
})
export class CreateStoreComponent implements OnInit {

  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  //BUILDER DEL FORM
  storeForm: FormGroup = this.formBuilder.group({
    storeName: [null],
    phone: [null],
    email: [null],
    street: [null],
    city: [null],
    state: [null],
    zipCode: [null]
  })

  constructor(
    private storeService: StoreService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.storeForm.value);
    this.storeService.CreateAsync(<Store>this.storeForm.value)
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
