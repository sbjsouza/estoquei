import { Component, OnInit } from '@angular/core';
import { Lojas } from '../models/lojas';
import { LojasService } from '../services/lojas.service';
@Component({
  selector: 'store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.css']
})
export class StoreFilterComponent implements OnInit {

  constructor(private lojasService: LojasService) {}
  sortedLojas: Lojas[];
  lojas: Lojas[];
  loja: Lojas;
  
  ngOnInit(): void {
    this.getStores();
  }
  getStores() {
    this.lojasService.getStores().subscribe((lojas: Lojas[]) => {
      this.lojas = lojas;
      //this.sortedLojas = this.getSortedStores(this.lojas);
    });
  }
  getStoresById(id: number) {
    this.lojasService.getStoreById(id).subscribe((loja: Lojas) => {
      this.loja = loja;
    });
  }

}
