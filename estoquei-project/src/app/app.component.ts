import { Component, OnInit } from '@angular/core';

import { ProdutoService } from './services/produto.service';
import { Produto } from './models/produto';
import { VendedorService } from './services/vendedor.service';
import { Vendedor } from './models/vendedor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'estoquei-project';

  produto = {} as Produto;
  produtos: Produto[];
  vendedor = {} as Vendedor;
  vendedores: Vendedor[];

  constructor(
    private produtoService: ProdutoService,
    private vendedorService: VendedorService
  ) {}

  ngOnInit() {
    this.getProducts();
    this.getProductBySku(1);
    this.getSellers();
    this.getSellersById(1);
    console.log('Produtos: ', this.produtos);
  }

  getProducts() {
    this.produtoService.getProducts().subscribe((produtos: Produto[]) => {
      this.produtos = produtos;
      // console.log('Produto 2: ', produtos);
    });
  }
  getProductBySku(sku: number) {
    this.produtoService.getProduct(sku).subscribe((produto: Produto) => {
      this.produto = produto;
      // console.log('Produto 3: ', produto);
    });
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
