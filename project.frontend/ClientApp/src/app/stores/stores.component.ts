import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '../dto/Store.interface';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  private title = 'Stores';
  public stores!: Store[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private storeService: StoreService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.storeService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.stores = response;
          this.dataSource.data = this.stores;
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

  ngOnInit(): void {
    this.GetAsync();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //SEZIONE MAT-TABLE
  public pageSizeOptions = [10, 25, 50]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Store>();

  displayedColumns = [
    'storeId',
    'storeName',
    'phone',
    'email',
    'street',
    'city',
    'state',
    'zipCode',
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
}
