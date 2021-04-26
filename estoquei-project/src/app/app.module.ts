import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { AddProductComponentComponent } from './add-product-component/add-product-component.component';

import { InputTextModule } from 'primeng/inputtext';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    VendasComponent,
    ProdutosComponent,
    VendedorComponent,
    AddProductComponentComponent,
    ProductListComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, InputTextModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
