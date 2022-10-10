import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../dto/Category.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  constructor(
    private brandService: CategoryService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  categoryForm!: FormGroup;

  ngOnInit() {
    //BUILDER DEL FORM
    this.categoryForm = this.formBuilder.group({
      categoryName: ['']
    })
  }

  loading: boolean = false;
  errorMessage!: string;

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.brandService.CreateAsync(<Category>this.categoryForm.value)
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
          console.info('Request completed')      //This is actually not needed 
          this.loading = false;
        })
  }
}
