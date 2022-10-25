import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from '../../dto/Brand.interface';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css'],
})

export class CreateBrandComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    private router: Router,
    public formBuilder: FormBuilder
  ) { }

  brandForm!: FormGroup;

  ngOnInit() {
    //BUILDER DEL FORM
    this.brandForm = this.formBuilder.group({
      brandName: [null]
    })
  }

  loading: boolean = false;
  errorMessage!: string;

  //FUNZIONE PER CREARE L'OGGETTO
  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
     this.brandService.CreateAsync(<Brand>this.brandForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/brands']);
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
