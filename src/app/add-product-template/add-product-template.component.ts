import { ProductService } from './../service/product.service';
import { Product } from './../models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-add-product-template',
  templateUrl: './add-product-template.component.html',
  styleUrls: ['./add-product-template.component.css']
})
export class AddProductTemplateComponent implements OnInit {

  product: Product = new Product();
  formSubmitted = false;
  productTypes = ['Laptop', 'Mobile'];
  constructor(private productService: ProductService,
            private router: Router,
            private loaderService: LoaderService) {
  }

  ngOnInit() {
  }

  addProduct() {
    this.loaderService.showLoader();
    this.productService.addProduct(this.product).subscribe(result => {
      this.formSubmitted = true;
      this.loaderService.hideLoader();
      this.router.navigateByUrl('/products');
    });
  }

}
