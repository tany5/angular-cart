import Iproduct from 'src/app/shared/models/product';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-productcard',
  templateUrl: './productcard.component.html',
  styleUrls: ['./productcard.component.scss']
})
export class ProductcardComponent implements OnInit {
  @Input() product: Iproduct | undefined
  @Output() addProduct = new EventEmitter()
  constructor() { }

  ngOnInit(): void {
  }

  addToCart() {
    this.addProduct.emit(this.product)
  }

}
