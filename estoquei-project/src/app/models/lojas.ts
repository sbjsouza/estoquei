export class Lojas {
    name: string;
    store_localization_url: string;
    id: number;
    monthly_sells: number;
    monthly_expense_cost: number;
    seller_evaluation: string;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.name = '';
      this.store_localization_url = '';
      this.id = 0;
      this.monthly_sells = 0;
      this.monthly_expense_cost = 0;
      this.seller_evaluation = '';
    }
  }
  