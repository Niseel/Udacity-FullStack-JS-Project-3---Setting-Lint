import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  Subscription,
  catchError,
  delay,
  finalize,
  tap,
  throwError,
} from 'rxjs';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductService } from 'src/app/services/product.service';
import Product from 'src/app/models/product';

interface Option {
  option: string;
  value: number;
}

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent implements OnInit {
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoaderService
  ) {}

  product: Product = {
    id: 0,
    name: 'Loading Product Name',
    price: 0,
    url: 'Loading Product Image',
    description: 'Loading Product Description',
  };

  loading: any;
  amount = 1;
  subscriptions: Subscription[] = [];
  productId = this.activatedRoute.snapshot.params['id'] || '';
  selectAmount: Option[] = [];
  ngOnInit(): void {
    this.selectAmount = [
      {
        option: 'Option 1',
        value: 1,
      },
      {
        option: 'Option 2',
        value: 2,
      },
      {
        option: 'Option 3',
        value: 3,
      },
      {
        option: 'Option 4',
        value: 4,
      },
      {
        option: 'Option 5',
        value: 5,
      },
      {
        option: 'Option 6',
        value: 6,
      },
    ];

    this.startLoading();
    this.productService
      .getProductList()
      .pipe(
        delay(1000),
        finalize(() => this.stopLoading()),
        catchError((error) => {
          return throwError(error);
        })
      )
      .subscribe({
        next: (products) => {
          const product = products.find(
            (product: Product) => product.id == this.productId
          );
          if (product) this.product = product;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }
  addProductToCart(product: Product, amount: number) {
    this.productService.addProductToCart(product, amount);
    alert('Add Product to Cart , Please clicking to cart to review');
  }

  startLoading(): void {
    this.loadingService.setLoading(true);
    this.loading = this.loadingService.getLoading();
  }

  stopLoading(): void {
    this.loadingService.setLoading(false);
    this.loading = this.loadingService.getLoading();
  }
}
