import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Order } from '../../dto/Order.interface';
import { Staff } from '../../dto/Staff.interface';
import { Store } from '../../dto/Store.interface';
import { OrderService } from '../../services/order.service';
import { StaffService } from '../../services/staff.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css']
})
export class UpdateOrderComponent implements OnInit {

  public orderId!: number;
  public loading: boolean = false;
  public errorMessage!: string;
  public staffs!: Staff[];
  public stores!: Store[];
  public orders!: Order[];
  public filteredOrders!: Order[];
  public actualOrder!: Order;

  constructor(
    private orderService: OrderService,
    private storeService: StoreService,
    private staffService: StaffService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  //BUILDER DEL FORM
  orderForm: FormGroup = this.formBuilder.group({
    customerId: [null],
    orderStatus: [null], //qua dovrei inserire un'elenco di status
    orderDate: [null],
    requiredDate: [null],
    shippedDate: [null],
    storeId: [null],
    staffId: [null],
    orderId: [null]
  })

  //RECALL DEI DATI PER STORE
  public GetStores() {
    this.loading = true;
    this.errorMessage = "";
    this.storeService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.stores = response;
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

  //RECALL DEI DATI PER STAFF
  public GetStaffs() {
    this.loading = true;
    this.errorMessage = "";
    this.staffService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.staffs = response;
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

  //RECALL DEI DATI PER ORDERS
  public GetOrders() {
    this.loading = true;
    this.errorMessage = "";
    this.orderService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.orders = response;
          this.filteredOrders = response;
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

  //FILTRO CLIENTI
  FilterCustomer(enteredData: string) {
    this.filteredOrders = this.orders.filter(order => {
      return order.customerName
        .trim()
        .toLowerCase()
        .indexOf(enteredData) === 0;
    })
  }

  //FUNZIONE CHE INIZIALIZZA IL FILTRO CLIENTI
  FormInit() {
    this.orderForm.get('customerName')?.valueChanges
      .subscribe(response => {
        this.FilterCustomer(response);
      })
  }

  //FILTRO DATA CHE RESTITUISCE SOLO FERIALI
  DateFilter: (date: Date | null) => boolean =
    (date: Date | null) => {
      if (!date) {
        return false;
      }
      const day = date.getDay();
      return day != 0 && day != 6; // Tolgo Sabato e Domenica.
    };

  //RECALL DEI DATI USANDO IL PARAM URL
  GetDataByParam() {
    concat(
      this.orderId = this._Activatedroute.snapshot.params["orderId"],
      of(this.orderService
        .FindByIdAsync(this.orderId)
        .subscribe(
          (res) => {
            const {
              orderId,
              customerId,
              orderStatus,
              orderDate,
              requiredDate,
              shippedDate,
              storeId,
              staffId
            } = res;
            this.orderForm.patchValue({
              orderId,
              customerId,
              orderStatus,
              orderDate,
              requiredDate,
              shippedDate,
              storeId,
              staffId
            });
            this.actualOrder = res
          }
        ))
    )
  }

  ngOnInit() {
    this.GetDataByParam()
    this.GetStores();
    this.GetStaffs();
    this.GetOrders();
    this.FormInit();
  }

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.orderService.UpdateAsync(<Order>this.orderForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/orders']);
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
