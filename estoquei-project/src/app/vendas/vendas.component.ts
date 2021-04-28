import { Component, OnInit } from '@angular/core';

import { Vendas } from '../models/vendas';
import { VendasService } from '../services/vendas.service';

@Component({
  selector: 'app-vendas',
  templateUrl: './vendas.component.html',
  styleUrls: ['./vendas.component.css']
})
export class VendasComponent implements OnInit {
  vendas: any;
  constructor(private vendasService: VendasService) { }

  

  ngOnInit(): void {
    this.vendas = this.vendasService.getSells()
    //console.log(this.vendas)
  }



}

