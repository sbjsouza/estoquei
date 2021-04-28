import { Component, OnInit } from '@angular/core';

import { Vendedor } from '../models/vendedor';
import { VendedorService } from '../services/vendedor.service';

@Component({
  selector: 'top-sellers-rank',
  templateUrl: './top-sellers-rank.component.html',
  styleUrls: ['./top-sellers-rank.component.css'],
})
export class TopSellersRankComponent implements OnInit {
  constructor(private vendedorService: VendedorService) {}

  vendedor = {} as Vendedor;
  vendedores: Vendedor[];
  sortedVendedores: Vendedor[];

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers() {
    this.vendedorService.getSellers().subscribe((vendedores: Vendedor[]) => {
      this.vendedores = vendedores;
      this.sortedVendedores = this.getSortedSellers(this.vendedores);
    });
  }
  getSellersById(id: number) {
    this.vendedorService.getSeller(id).subscribe((vendedor: Vendedor) => {
      this.vendedor = vendedor;
    });
  }
  getSortedSellers(sellerList: Vendedor[]) {
    const temp_sorted = sellerList.sort((a, b) =>
      (a.monthly_sells != 0
        ? parseInt(a.monthly_sales_price) / a.monthly_sells
        : 0) <
      (b.monthly_sells != 0
        ? parseInt(b.monthly_sales_price) / b.monthly_sells
        : 0)
        ? 1
        : -1
    );
    return temp_sorted;
  }
}
