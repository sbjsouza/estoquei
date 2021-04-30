import { Vendas } from '../models/vendas';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  url = 'http://localhost:3000/vendas';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos os produtos
  getSells(): Observable<Vendas[]> {
    return this.httpClient
      .get<Vendas[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem a venda pelo nome do produto
  getSellByName(product: string): Observable<Vendas> {
    return this.httpClient
      .get<Vendas>(this.url + '/' + product)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem a venda pelo id do vendedor
  getSellByID(id: number): Observable<Vendas> {
    return this.httpClient
      .get<Vendas>(this.url + '/' + id)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
