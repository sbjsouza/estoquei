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
        this.id = 0;
        this.monthly_sells = 0;
        this.monthly_expense_cost = 0;
        this.store_profit = 0;
    }
}
exports.Lojas = Lojas;
