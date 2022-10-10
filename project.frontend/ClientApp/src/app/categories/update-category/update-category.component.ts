import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { concat, of } from 'rxjs';
import { Category } from '../../dto/Category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.css']
})
export class UpdateCategoryComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  categoryId!: number;
  categoryForm: FormGroup =
    this.formBuilder.group({
      categoryId: [null],
      categoryName: [null]
    });

  GetDataByParam() {
    concat(
      this.categoryId = this._Activatedroute.snapshot.params["categoryId"],
      of(this.categoryService
        .FindByIdAsync(this.categoryId)
        .subscribe(
          (res) => {
            const { categoryId, categoryName } = res;
            this.categoryForm.patchValue({
              categoryId,
              categoryName
            });
          }
        ))
    )
  }

  ngOnInit() {
    this.GetDataByParam()
  }

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  loading: boolean = false;
  errorMessage!: string;

  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.categoryService.UpdateAsync(<Category>this.categoryForm.value)
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
