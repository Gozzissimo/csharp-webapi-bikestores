import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Customer } from '../../dto/Customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  styleUrls: ['./update-customer.component.css']
})
export class UpdateCustomerComponent implements OnInit {

  public customerId!: number;
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(
    private customerService: CustomerService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  //BUILDER DEL FORM
  customerForm: FormGroup = this.formBuilder.group({
    firstName: [null],
    lastName: [null],
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
      this.customerId = this._Activatedroute.snapshot.params["customerId"],
      of(this.customerService
        .FindByIdAsync(this.customerId)
        .subscribe(
          (res) => {
            const {
              firstName,
              lastName,
              phone,
              email,
              street,
              city,
              state,
              zipCode
            } = res;
            this.customerForm.patchValue({
              firstName,
              lastName,
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
    this.customerService.UpdateAsync(<Customer>this.customerForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/customers']);
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
