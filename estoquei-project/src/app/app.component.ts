import { Component, OnInit } from '@angular/core';

import { ProdutoService } from './services/produto.service';
import { Produto } from './models/produto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'estoquei-project';

  produto = {} as Produto;
  produtos: Produto[];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit() {
    this.getProducts();
    this.getProductBySku(1);
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
}
