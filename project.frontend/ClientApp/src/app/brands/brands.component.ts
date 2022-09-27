import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BrandService } from '../services/brand.service';
import { Brand } from '../dto/Brand.interface';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css'],
  providers: [BrandService]
})
export class BrandsComponent implements OnInit, AfterViewInit {
  private title = 'Brands';
  public brands!: Brand[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private brandService: BrandService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.brandService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.brands = response;
          this.dataSource.data = this.brands;
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
  public pageSizeOptions = [10,25,50]

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  dataSource = new MatTableDataSource<Brand>();

  displayedColumns = ['brandName', 'actions'];

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
