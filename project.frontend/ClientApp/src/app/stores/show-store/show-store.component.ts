import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Stock } from '../../dto/Stock.interface';
import { Store } from '../../dto/Store.interface';
import { StockService } from '../../services/stock.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-show-store',
  templateUrl: './show-store.component.html',
  styleUrls: ['./show-store.component.css']
})
export class ShowStoreComponent implements OnInit {

  storeId!: number;
  allStocks!: Stock[];
  filteredStock!: Stock[];
  actualStore!: Store;
  isLoading: boolean = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private storeService: StoreService,
    private stockService: StockService,
    private router: Router
  ) {
  }

  //RECALL DEI DATI PER BRAND
  public GetStocks() {
    this.loading = true;
    this.errorMessage = "";
    this.stockService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.allStocks = response;
          this.filteredStock = this.allStocks.filter(element => {
            return element.storeId == this.storeId;
          })
          this.dataSource.data = this.filteredStock;
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

  GetDataByParam() {
    concat(
      this.storeId = this._Activatedroute.snapshot.params["storeId"],
      of(this.storeService
        .FindByIdAsync(this.storeId)
        .subscribe(
          (res) => {
            this.actualStore = res
            this.isLoading = false
          }
        ))
    )
  }

  ngOnInit(): void {
    this.GetDataByParam();
    this.GetStocks();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //SEZIONE MAT-TABLE
  public pageSizeOptions = [10, 25, 50]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Stock>();

  displayedColumns = [
    'productId',
    'productName',
    'quantity',
    'actions'
  ];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //FUNZIONE CHE MOSTRA LA ROW CLICCANDOLA
  onRowClicked(row: any) {
    console.log('Row clicked: ', row);
  }

  //FUNZIONE DELETE
  loading: boolean = false;
  errorMessage!: string;

  public DeleteAsync(id: number) {
    this.loading = true;
    this.errorMessage = "";
    if (confirm("Are you sure do you want to delete this Store?")) {
      this.storeService.DeleteAsync(id)
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
}
