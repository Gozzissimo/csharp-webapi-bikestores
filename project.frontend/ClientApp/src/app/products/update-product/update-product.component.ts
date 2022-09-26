import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../dto/Product.interface';
import { ProductService } from '../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  constructor(
    private productService: ProductService,
    private _Activatedroute: ActivatedRoute,
    private router: Router,
    public formBuilder: FormBuilder,
  ) { }

  productId!: number;
  productForm: FormGroup =
    this.formBuilder.group({
      productId: [null],
      productName: [null]
    });

  ngOnInit() {

    //FUNZIONE PER RICAVARE L'ID DALL'URL ATTUALE
    this._Activatedroute.paramMap.subscribe(params => {
      this.productId = Number(params.get("productId"));

      //FINDBYID PER RICAVARE I DATI DELL'OGGETTO IN QUESTIONE
      //DA RIPROPORRE IN PAGINA
      this.productService.FindByIdAsync(this.productId)
        .subscribe((response) => {
          const { productId, productName } = response;
          //BUILDER DEL FORM
          this.productForm.patchValue({
            productId,
            productName
          });
        });
    })
  }

  loading: boolean = false;
  errorMessage!: string;

  //FUNZIONE PER AGGIORNARE L'OGGETTO
  public UpdateAsync() {

    this.loading = true;
    this.errorMessage = "";
    this.productService.UpdateAsync(<Product>this.productForm.value)
      .subscribe(
        (response) => {                           //next() callback
          this.router.navigate(['/products']);
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
