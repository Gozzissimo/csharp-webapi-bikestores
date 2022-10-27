import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Order } from '../../dto/Order.interface';
import { OrderItem } from '../../dto/OrderItem.interface';
import { Product } from '../../dto/Product.interface';
import { OrderItemService } from '../../services/order-item.service';
import { OrderService } from '../../services/order.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-create-order-item',
  templateUrl: './create-order-item.component.html',
  styleUrls: ['./create-order-item.component.css']
})
export class CreateOrderItemComponent implements OnInit {

  public loading: boolean = false;
  public errorMessage!: string;
  public products!: Product[];
  public orders!: Order[];
  public orderItems!: OrderItem[];
  public filteredProducts!: Product[];

  //BUILDER DEL FORM
  orderItemForm: FormGroup = this.formBuilder.group({
    orderId: [null],
    itemId: [null],
    productId: [null],
    quantity: [null],
    listPrice: [null],
    discount: [null],
  })

  constructor(
    private productService: ProductService,
    private orderService: OrderService,
    private orderItemService: OrderItemService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  //RECALL DEI DATI PER STORE
  public GetProducts() {
    this.loading = true;
    this.errorMessage = "";
    this.productService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.products = response;
          this.filteredProducts = response;
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

  public GetOrders() {
    this.loading = true;
    this.errorMessage = "";
    this.orderService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.orders = response;
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

  public GetOrderItems() {
    this.loading = true;
    this.errorMessage = "";
    this.orderItemService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.orderItems = response;
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


  //FILTRO PRODOTTI
  FilterProduct(enteredData: string) {
    this.filteredProducts = this.products.filter(product => {
      return product.productName
        .trim()
        .toLowerCase()
        .indexOf(enteredData) === 0;
    })
  }

  ////FUNZIONE CHE INIZIALIZZA IL FORM
  FormInit() {
    //FILTRO SU PRODOTTI
    this.orderItemForm.get('productId')?.valueChanges
      .subscribe(response => {
        this.FilterProduct(response);
      })

    //ITEMID A PARTIRE DA ORDERID
    var orderId = this.orderItemForm.get('orderId')

    orderId?.valueChanges
      .subscribe(response => {
        console.log("OrderId :", response);

        var filteredItems = this.orderItems.filter(orderItem => {
          return orderItem.orderId == response
        })

        console.log("Array di obj orderItem Filtrati :", filteredItems)

        if (filteredItems.length == 0) {
          this.orderItemForm.patchValue({
            itemId: 1
          })
        }
        else {
          var listOfItemId = filteredItems.map(items => items.itemId)
          console.log("Array di orderItemId listati: ", listOfItemId)

          var newItemId = Math.max.apply(Math, listOfItemId) + 1;
          console.log("Max ID: ", newItemId - 1)

          this.orderItemForm.patchValue({
            itemId: newItemId
          })
        }
      })
  }

  ngOnInit() {
    this.GetProducts();
    this.GetOrders();
    this.GetOrderItems();
    this.FormInit();
  }

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    console.log(this.orderItemForm.value);
    this.orderItemService.CreateAsync(<OrderItem>this.orderItemForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/order-items']);
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
