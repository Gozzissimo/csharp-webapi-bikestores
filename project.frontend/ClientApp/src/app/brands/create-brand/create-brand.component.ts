import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Brand } from '../../dto/brand.model';
import { BrandService } from '../../services/brand.service';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.css'],
  providers: [BrandService]
})
export class CreateBrandComponent implements OnInit {

  constructor(
    private brandService: BrandService,
    public fb: FormBuilder
  ) { }

  brandForm!: FormGroup;

  ngOnInit() {
    this.brandForm = this.fb.group({
      brandName: ['']
    })
  }

  loading: boolean = false;
  errorMessage!: string;

  public CreateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.brandService.CreateAsync(<Brand>this.brandForm.value)
      .subscribe(
        (response) => {                           //next() callback
          //QUA PORTEREI L'UTENTE SULLA SHOW DEL NUOVO ID
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
