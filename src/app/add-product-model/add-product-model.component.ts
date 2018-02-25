import { LoaderService } from './../service/loader.service';
import { ProductService } from './../service/product.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../models/product';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product-model',
  templateUrl: './add-product-model.component.html',
  styleUrls: ['./add-product-model.component.css']
})
export class AddProductModelComponent implements OnInit {

  productTypes = ['Laptop', 'Mobile'];

  formSubmitted = false;
  myForm: FormGroup;

  title: FormControl;
  modelName: FormControl;
  color: FormControl;
  productType: FormControl;
  brand: FormControl;
  price: FormControl;


  constructor(private productService: ProductService,
              private router: Router,
              private loaderService: LoaderService) { }

  ngOnInit() {

    this.title = new FormControl('', [Validators.required, Validators.minLength(10)]);
    this.modelName = new FormControl();
    this.color = new FormControl('', Validators.pattern('[a-zA-Z]*'));
    this.productType = new FormControl('', Validators.required);
    this.brand = new FormControl('', Validators.required);
    this.price = new FormControl('', [Validators.required, Validators.min(1)]);

    this.myForm = new FormGroup({
      'title': this.title,
      'modelName': this.modelName,
      'productType': this.productType,
      'color': this.color,
      'brand': this.brand,
      'price': this.price
    });

  }

  addProduct(product: Product) {
    this.loaderService.showLoader();
    this.productService.addProduct(product).subscribe(result => {
      this.formSubmitted = true;
      this.loaderService.hideLoader();
      this.router.navigateByUrl('/products');
    });
  }

}
