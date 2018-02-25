import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Http, Headers, RequestOptionsArgs } from '@angular/http'
import 'rxjs/Rx';

@Injectable()
export class ProductService {

  productsUrl = 'api/products';

  constructor(private http: Http) {

  }

  getProducts(): Observable<Product[]> {
    return this.http.get(this.productsUrl)
      .map(products => {
        console.log("products fetched...");
        console.log(products.json());
        return products.json() as Product[]})
      .catch(this.handleError);

  }

  handleError(error: Response | any) {
    let errMsg: string;

    if (error instanceof Response) {
      errMsg = `${error.status} - ${error.statusText}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    if (error.status === 404) {
      console.log('Server not Found');
    }

    console.log(errMsg);

    return Observable.throw(error);
  }

  addProduct(product: Product): Observable<Product> {

    let headers: Headers = new Headers({'Content-Type':'application/json'});
    const reqOpt = { 'headers': headers };

    return this.http.post(this.productsUrl, JSON.stringify(product), reqOpt)
      .map(p => {
        console.log(`added product with id=${p.json().id}`);
        return p.json() as Product
      })
      .catch(this.handleError)
  }

  getProduct(id: number): Observable<Product> {

    const url = `${this.productsUrl}/${id}`;
    return this.http.get(url)
      .map(product => {
        console.log(`fetched product id=${id}`);
        return product.json() as Product
      })
      .catch(this.handleError)
  }

  removeProduct(product: Product | number): Observable<Product> {
    let headers: Headers = new Headers();
    const reqOpt = { 'headers': headers };

    const id = typeof product === 'number' ? product : product.id;
    const url = `${this.productsUrl}/${id}`;

    return this.http.delete(url, reqOpt)
      .map(_ => console.log(`deleted Product id=${id}`))
      .catch(this.handleError)

  }
}
