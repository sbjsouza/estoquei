"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendas = void 0;
class Vendas {
    constructor() {
        this.clean();
    }
    clean() {
        this.product = '';
        this.sku = 0;
        this.id = 0;
        this.quantity = 0;
        this.value = '';
        this.data = '';
    }
}
exports.Vendas = Vendas;
