"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vendedor = void 0;
class Vendedor {
    constructor() {
        this.clean();
    }
    clean() {
        this.name = '';
        this.picture_url = '';
        this.id = 0;
        this.monthly_sells = 0;
        this.monthly_sales_price = '';
        this.seller_evaluation = '';
    }
}
exports.Vendedor = Vendedor;
