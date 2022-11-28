import { Subscription } from 'rxjs';
import { CartService } from './../../shared/services/cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import Iproduct from 'src/app/shared/models/product';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit, OnDestroy {
  productList: Iproduct[] = []
  prodducts$: Subscription | undefined
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.prodducts$ = this.cartService.getProduct().subscribe({
      next: (products: Iproduct[]) => {
        this.productList = products
      },
      error: (error: HttpErrorResponse) => {
        console.log(error)
      }
    })
  }

  addProductToCart(event: Iproduct) {
    this.prodducts$ = this.cartService.addToCart(event).subscribe({
      next: () => {
        this.cartService.getTotalCartItem()
      }
    })
  }

  ngOnDestroy(): void {
    this.prodducts$?.unsubscribe()
  }

}
