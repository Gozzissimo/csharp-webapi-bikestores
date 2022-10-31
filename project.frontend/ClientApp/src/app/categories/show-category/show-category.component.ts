import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Category } from '../../dto/Category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {

  categoryId!: number;
  actualCategory!: Category;
  isLoading: boolean = true;

  constructor(
    private _Activatedroute: ActivatedRoute,
    private categoryService: CategoryService,
    private router: Router
  ) { }

  GetDataByParam() {
    concat(
      this.categoryId = this._Activatedroute.snapshot.params["categoryId"],
      of(this.categoryService
        .FindByIdAsync(this.categoryId)
        .subscribe(
          (res) => {
            this.actualCategory = res
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
    if (confirm("Are you sure do you want to delete this Brand?")) {
      this.categoryService.DeleteAsync(id)
        .subscribe(
          (response) => {                           //next() callback
            this.router.navigate(['/categories']);
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
