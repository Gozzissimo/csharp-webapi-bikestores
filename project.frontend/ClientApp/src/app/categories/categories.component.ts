import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../dto/Category.interface';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterViewInit {

  private title = 'Categories';
  public categories!: Category[];
  public filterText: string = '';
  public loading: boolean = false;
  public errorMessage!: string;

  constructor(private categoryService: CategoryService) { }

  public GetAsync() {
    this.loading = true;
    this.errorMessage = "";
    this.categoryService.GetAsync()
      .subscribe(
        (response) => {                           //next() callback
          this.categories = response;
          this.dataSource.data = this.categories;
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

  dataSource = new MatTableDataSource<Category>();

  displayedColumns = ['categoryName', 'actions'];

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
