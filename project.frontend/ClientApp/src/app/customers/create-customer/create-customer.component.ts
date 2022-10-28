import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Customer } from '../../dto/Customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  //BUILDER DEL FORM
  customerForm: FormGroup = this.formBuilder.group({
    firstName: [null],
    lastName: [null],
    phone: [null],
    email: [null],
    street: [null],
    city: [null],
    state: [null],
    zipCode: [null]
  })

  constructor(
    private customerService: CustomerService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.customerForm.value);
    this.customerService.CreateAsync(<Customer>this.customerForm.value)
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
