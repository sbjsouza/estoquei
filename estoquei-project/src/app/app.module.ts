import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardComponent } from './card/card.component';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';

@NgModule({
  declarations: [AppComponent, CardComponent, VendasComponent, ProdutosComponent, VendedorComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
