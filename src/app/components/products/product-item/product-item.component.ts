import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import Product from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

interface Option {
  option: string;
  value: number;
}

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  night?: number;

  @Input() product: Product = new Product();
  @Output() addedToCart = new EventEmitter();
  constructor(
    private router: Router,
    private productService: ProductService
  ) {}
  amount = 1;
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
        option: 'Option 5',
        value: 6,
      },
    ];
  }
  addToCart(product: Product, amount: number) {
    this.productService.addProductToCart(product, amount);
    alert('Add Product to Cart , Please clicking to cart to review');
  }
  navigateToProductDetail(id: number): void {
    this.router.navigateByUrl(`/product/${id}`);
  }


  FunCION() {
    const hve_a_cake = 1;
    let morning: any;

    var kaiser = 1;

    console.log('hi');
  }
}
