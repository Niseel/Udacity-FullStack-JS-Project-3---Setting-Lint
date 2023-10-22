import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import ItemInCart from 'src/app/models/itemsInCart';
import Product from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private router: Router
  ) {}
  itemsInCart: ItemInCart[] = [];
  products: Product[] = [];
  totalPrice = 0;

  fullName = '';
  address = '';
  creditCard = '';
  ngOnInit(): void {
    this.itemsInCart = this.productService.getProductsInStore();
    this.itemsInCart.forEach((item) => {
      this.totalPrice += item.amount * item.product.price;
    });
    this.totalPrice = Number(this.totalPrice.toFixed(2));
  }
  handleSubmit() {
    this.router.navigateByUrl(
      `confirmation?fullName=${this.fullName}&totalPrice=${this.totalPrice}`
    );
    this.clearDataInCart();
    alert('Submit');
  }
  clearDataInCart() {
    this.productService.$cartStore.next([]);
    this.fullName = '';
    this.address = '';
    this.creditCard = '';
    this.totalPrice = 0;
  }
  onHandleAmountChange(event: any) {
    if (event.amount == 0) {
      alert('Remove product ');
      this.productService.removeProductFromCart(event.product);
      this.itemsInCart = this.itemsInCart.filter(
        (item: any) => item.product.id !== event.product.id
      );
    }
    this.totalPrice = 0;
    this.itemsInCart.map((item) => {
      if (item.product.id == event.product.id) {
        item['amount'] = event['amount'];
      }
      this.totalPrice += item.amount * item.product.price;
      this.totalPrice = Number(this.totalPrice.toFixed(2));
    });
  }
}
