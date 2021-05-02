import { Component, OnInit } from '@angular/core';
import { Lojas } from '../models/lojas';
@Component({
  selector: 'store-filter',
  templateUrl: './store-filter.component.html',
  styleUrls: ['./store-filter.component.css']
})
export class StoreFilterComponent implements OnInit {

  constructor() { }
  sortedLojas: Lojas[];
  ngOnInit(): void {
  }

}
