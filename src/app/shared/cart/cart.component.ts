import Iproduct from 'src/app/shared/models/product';
import { Subscription } from 'rxjs';
import { CartService } from './../services/cart.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, OnDestroy {
  cartCount: Subscription | undefined
  cartPrice: Subscription | undefined
  cartItems: Iproduct[] = []
  count: number = 0
  total: number = 0

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    this.getProduct()
  }

  addAnother(product: Iproduct) {
    this.cartService.addToCart(product).subscribe({
      next: () => {
        this.getProduct()
      }
    })
  }
  removeProduct(product: Iproduct) {
    this.cartService.removeProduct(product).subscribe({
      next: () => {
        this.getProduct()
      }
    })
  }

  async getProduct() {
    this.cartCount = this.cartService.getTotalCartItem().subscribe((count) => this.count = count)
    this.cartPrice = this.cartService.getTotalCartAmount().subscribe((amount) => this.total = amount)
    this.cartService.cartProducts().subscribe({
      next: (items: Iproduct[]) => {
        this.cartItems = items
        console.log(this.cartItems)
      }
    })
  }

  ngOnDestroy(): void {
    this.cartCount?.unsubscribe()
    this.cartPrice?.unsubscribe()
  }

}
