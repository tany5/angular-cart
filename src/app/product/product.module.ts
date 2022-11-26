import { MaterialModule } from './../material/material.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import { ProductlistComponent } from './productlist/productlist.component';


@NgModule({
  declarations: [
    ProductComponent,
    ProductlistComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule,
    MaterialModule
  ]
})
export class ProductModule { }
