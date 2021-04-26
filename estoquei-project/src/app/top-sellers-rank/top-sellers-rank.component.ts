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

  ngOnInit(): void {
    this.getSellers();
  }

  getSellers() {
    this.vendedorService.getSellers().subscribe((vendedores: Vendedor[]) => {
      this.vendedores = vendedores;
      console.log('Vendedor 2: ', vendedores);
    });
  }
  getSellersById(id: number) {
    this.vendedorService.getSeller(id).subscribe((vendedor: Vendedor) => {
      this.vendedor = vendedor;
      console.log('Vendedor 3: ', vendedor);
    });
  }
}
