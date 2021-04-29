"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VendedorService = void 0;
const core_1 = require("@angular/core");
const http_1 = require("@angular/common/http");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let VendedorService = class VendedorService {
    // injetando o HttpClient
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.url = 'http://localhost:3000/sellers';
        // Headers
        this.httpOptions = {
            headers: new http_1.HttpHeaders({ 'Content-Type': 'application/json' }),
        };
    }
    // Obtem todos os produtos
    getSellers() {
        return this.httpClient
            .get(this.url)
            .pipe(operators_1.retry(2), operators_1.catchError(this.handleError));
    }
    // Obtem um produto pelo id
    getSeller(id) {
        return this.httpClient
            .get(this.url + '/' + id)
            .pipe(operators_1.retry(2), operators_1.catchError(this.handleError));
    }
    getScore(vendedor) {
        return vendedor.monthly_sells != 0
            ? parseInt(vendedor.monthly_sales_price) / vendedor.monthly_sells
            : 0;
    }
    // Manipulação de erros
    handleError(error) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        }
        else {
            // Erro ocorreu no lado do servidor
            errorMessage =
                `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return rxjs_1.throwError(errorMessage);
    }
};
VendedorService = __decorate([
    core_1.Injectable({
        providedIn: 'root',
    })
], VendedorService);
exports.VendedorService = VendedorService;
