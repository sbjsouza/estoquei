export class Vendedor {
  name: string;
  picture_url: string;
  id: number;
  monthly_sells: number;
  monthly_sales_price: string;
  seller_evaluation: string;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.name = '';
    this.picture_url = '';
    this.id = 0;
    this.monthly_sells = 0;
    this.monthly_sales_price = '';
    this.seller_evaluation = '';
  }
}
