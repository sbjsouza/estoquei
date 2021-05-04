"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lojas = void 0;
class Lojas {
    constructor() {
        this.clean();
    }
    clean() {
        this.name = '';
        this.image = '';
        this.store_localization_url = '';
        this.id = '';
        this.monthly_sells = '';
        this.monthly_expense_cost = '';
        this.store_profit = '';
    }
}
exports.Lojas = Lojas;
