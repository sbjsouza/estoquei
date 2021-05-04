import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Vendas } from '../models/vendas';
import { VendasService } from '../services/vendas.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  topRevenues: Observable<Vendas[]>;
  topSales: Observable<Vendas[]>;
  vendas: Observable<Vendas[]>;

  constructor(private vendasService: VendasService) {}

  ngOnInit(): void {
    this.vendas = this.vendasService.getSells();
    this.topRevenues = this.vendas.pipe(
      map(sales=>{
        sales = sales.map(sale=>{
          sale['revenue'] = sale.quantity * parseFloat(sale.value);
          return sale;
        }).sort((a, b) => b['revenue'] - a['revenue']).filter((_, i)=> i<3);
        return sales;
    }));
    this.topSales = this.vendas.pipe(
      map(sales=>{
        sales = sales.sort((a, b) => b.quantity - a.quantity).filter((_, i)=> i<3);
        return sales;
    }));
  }
}
