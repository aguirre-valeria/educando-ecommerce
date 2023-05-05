import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';

import { LayautModule } from './layouts/layouts.module';
import { PagesModule } from './pages/pages.module';
import { EcommerceModule } from './ecommerce/ecommerce.module';
@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    LayautModule,
    PagesModule,
    EcommerceModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }