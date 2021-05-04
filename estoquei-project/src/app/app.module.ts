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
import { TableModule } from 'primeng/table';
import { AvatarModule } from 'primeng/avatar';
import {GMapModule} from 'primeng/gmap';
import { ButtonModule } from 'primeng/button';

import { CalendarModule } from 'primeng/calendar';
import { ProductListComponent } from './product-list/product-list.component';
import { TopSellersRankComponent } from './top-sellers-rank/top-sellers-rank.component';
import { LojasComponent } from './lojas/lojas.component';
import { StoreFilterComponent } from './store-filter/store-filter.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    VendasComponent,
    ProdutosComponent,
    VendedorComponent,
    DashboardComponent,
    AddProductComponentComponent,
    ProductListComponent,
    TopSellersRankComponent,
    LojasComponent,
    StoreFilterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InputTextModule,
    TableModule,
    AvatarModule,
    CalendarModule,
    GMapModule,
    ButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
