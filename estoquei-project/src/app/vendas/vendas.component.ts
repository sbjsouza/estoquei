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
  list_vendas: Vendas[] = [];
  constructor(private vendasService: VendasService) { }

  

  ngOnInit(): void {
    this.vendas = this.vendasService.getSells()
    
    //console.log(this.vendas)
  }


  ConvertToCSV(objArray: any): string {
      var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
      var str = '';
      var row = "";
      console.log(objArray)
      
      for (var index in objArray[0]) {
          //Now convert each value to string and comma-separated
          row += index + ',';
      }
      row = row.slice(0, -1);
      //append Label row with line break
      str += row + '\r\n';

      for (var i = 0; i < array.length; i++) {
          var line = '';
          for (var index in array[i]) {
              if (line != '') line += ','

              line += array[i][index];
          }
          str += line + '\r\n';
      }
      //str = 'abc'
      return str;
  }

  downloadButtonPush() {
    
    
    this.vendasService.getSells().subscribe((sale: Vendas[]) => {
      this.list_vendas = sale;
      console.log(this.list_vendas)
      var csv = this.ConvertToCSV(this.list_vendas)
      var blob = new Blob([csv], { type: 'text/csv' });
      var url = window.URL.createObjectURL(blob);
      
      var a = document.createElement("a");
      a.href = url;
      a.download = 'TabelaVendas.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });
    
    
    
    
  }

}

