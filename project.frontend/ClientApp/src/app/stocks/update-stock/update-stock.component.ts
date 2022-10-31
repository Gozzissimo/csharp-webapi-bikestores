import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Stock } from '../../dto/Stock.interface';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-update-stock',
  templateUrl: './update-stock.component.html',
  styleUrls: ['./update-stock.component.css']
})
export class UpdateStockComponent implements OnInit {

  public storeId!: number;
  public productId!: number;
  public loading: boolean = false;
  public errorMessage!: string;
  //public brands!: Brand[];
  //public categories!: Category[];

  //BUILDER DEL FORM
  stockForm: FormGroup = this.formBuilder.group({
    storeId: [null],
    productId: [null],
    quantity: [null],
  });

  constructor(
    private stockService: StockService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }



  ////RECALL DEI DATI PER BRAND
  //public GetBrands() {
  //  this.loading = true;
  //  this.errorMessage = "";
  //  this.stock.GetAsync()
  //    .subscribe(
  //      (response) => {                           //next() callback
  //        this.brands = response;
  //      },
  //      (error) => {                              //error() callback
  //        console.error('Request failed with error')
  //        this.errorMessage = error;
  //        this.loading = false;
  //      },
  //      () => {                                   //complete() callback
  //        this.loading = false;
  //      })
  //}

  ////RECALL DEI DATI PER CATEGORY
  //public GetCategories() {
  //  this.loading = true;
  //  this.errorMessage = "";
  //  this.categoryService.GetAsync()
  //    .subscribe(
  //      (response) => {                           //next() callback
  //        this.categories = response;
  //      },
  //      (error) => {                              //error() callback
  //        console.error('Request failed with error')
  //        this.errorMessage = error;
  //        this.loading = false;
  //      },
  //      () => {                                   //complete() callback
  //        this.loading = false;
  //      })
  //}

  //RECALL DEI DATI USANDO IL PARAM URL
  GetDataByParam() {
    concat(
      this.storeId = this._Activatedroute.snapshot.params["storeId"],
      this.productId = this._Activatedroute.snapshot.params["productId"],
      of(this.stockService
        .FindByDoubleIdAsync(this.storeId, this.productId)
        .subscribe(
          (res) => {
            const {
              storeId,
              productId,
              quantity
            } = res;
            this.stockForm.patchValue({
              storeId,
              productId,
              quantity
            });
          }
        ))
    )
  }

  ngOnInit() {
    //this.GetBrands();
    //this.GetCategories();
    this.GetDataByParam()
  }

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.stockService.UpdateAsync(<Stock>this.stockForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate([`/stores/:${this.storeId}`]);
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
