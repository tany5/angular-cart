import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CartComponent } from './cart/cart.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductcardComponent } from './ui/productcard/productcard.component';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProductcardComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    CartComponent,
    ProductcardComponent
  ]
})
export class SharedModule { }
