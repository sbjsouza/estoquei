import { Produto } from '../models/produto';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Lojas } from '../models/lojas';

@Injectable({
  providedIn: 'root',
})
export class LojasService {
  url = 'http://localhost:3000/lojas';

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) {}

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // Obtem todos as Lojas
  getProducts(): Observable<Lojas[]> {
    return this.httpClient
      .get<Lojas[]>(this.url)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Obtem uma loja pelo id
  getProduct(sku: number): Observable<Lojas> {
    return this.httpClient
      .get<Lojas>(this.url + '/' + sku)
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
