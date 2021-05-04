export class Lojas {
    name: string;
    image: string;
    store_localization_url: string;
    id: string;
    monthly_sells: string;
    monthly_expense_cost: string;
    store_profit: string;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.name = '';
      this.image = '';      this.store_localization_url = '';
      this.id = '';
      this.monthly_sells = '';
      this.monthly_expense_cost = '';
      this.store_profit = '';
    }
  }
  