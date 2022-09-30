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

  ngOnInit() { }
}
