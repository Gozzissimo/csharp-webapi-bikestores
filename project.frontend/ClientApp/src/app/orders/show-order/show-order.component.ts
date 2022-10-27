import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Order } from '../../dto/Order.interface';
import { OrderItemService } from '../../services/order-item.service';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-show-order',
  templateUrl: './show-order.component.html',
  styleUrls: ['./show-order.component.css']
})
export class ShowOrderComponent implements OnInit {

  orderId!: number;
  actualOrder!: Order;
  isLoading: boolean = true;
  id: number = 0;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router
  ) {
  }

  GetDataByParam() {
    concat(
      this.orderId = this._Activatedroute.snapshot.params["orderId"],
      of(this.orderService
        .FindByIdAsync(this.orderId)
        .subscribe(
          (res) => {
            this.actualOrder = res
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
      this.orderService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/products']);
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
