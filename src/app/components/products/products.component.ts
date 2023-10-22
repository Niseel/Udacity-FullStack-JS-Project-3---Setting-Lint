import { Component, OnInit } from '@angular/core';
import { catchError, delay, finalize, throwError } from 'rxjs';
import Product from 'src/app/models/product';
import { LoaderService } from 'src/app/services/loader.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];
  loading: any;
  constructor(
    private productService: ProductService,
    private loadingService: LoaderService
  ) {}

  ngOnInit(): void {
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
          this.productList = products;
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  startLoading(): void {
    const x = 1;
    console.log('hi');
    this.loadingService.setLoading(true);
    this.loading = this.loadingService.getLoading();
  }

  stopLoading(): void {
    this.loadingService.setLoading(false);
    this.loading = this.loadingService.getLoading();
  }
}
