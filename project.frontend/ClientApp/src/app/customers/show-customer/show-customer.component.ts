import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Customer } from '../../dto/Customer.interface';
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-show-customer',
  templateUrl: './show-customer.component.html',
  styleUrls: ['./show-customer.component.css']
})
export class ShowCustomerComponent implements OnInit {

  customerId!: number;
  actualCustomer!: Customer;
  isLoading: boolean = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private customerService: CustomerService,
    private router: Router
  ) {
  }

  GetDataByParam() {
    concat(
      this.customerId = this._Activatedroute.snapshot.params["customerId"],
      of(this.customerService
        .FindByIdAsync(this.customerId)
        .subscribe(
          (res) => {
            this.actualCustomer = res
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
    if (confirm("Are you sure do you want to delete this Product?")) {
      this.customerService.DeleteAsync(id)
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
}
