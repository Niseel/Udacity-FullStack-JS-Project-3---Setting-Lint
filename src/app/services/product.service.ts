import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Product from '../models/product';
import ItemsInCart from '../models/itemsInCart';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  $cartStore: BehaviorSubject<Array<ItemsInCart> | any> = new BehaviorSubject(
    []
  );
  cartData = this.$cartStore.asObservable();
  constructor(private http: HttpClient) {}

  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>('./assets/data.json');
  }
  getProductsInStore() {
    return this.$cartStore.value;
  }
  addProductToCart(product: Product, amount: number) {
    const currentProductInCart = this.$cartStore.value;
    const existedProductInCart = currentProductInCart.find(
      (item: any) => item.product.id == product.id
    );
    if (existedProductInCart) {
      currentProductInCart.forEach((element: any, index: any) => {
        if (element.product.id === product.id) {
          const newAmount = Number(element.amount) + Number(amount);
          element['amount'] = newAmount;
          currentProductInCart[index] = element;
        }
      });
      this.$cartStore.next(currentProductInCart);
    } else {
      const newProductInCart: ItemsInCart = {
        product: product,
        amount: amount,
      };
      const updatedCartStore = [...currentProductInCart, newProductInCart];
      this.$cartStore.next(updatedCartStore);
    }
  }
  removeProductFromCart(product: Product) {
    const currentProductInCart = this.$cartStore.value;
    const updatedCartStore = currentProductInCart.filter(
      (item: any) => item.product.id !== product.id
    );
    this.$cartStore.next(updatedCartStore);
  }
}
