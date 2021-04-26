export class Produto {
  name: string;
  picture_url: string;
  description: string;
  sku: number;
  review_grade: string;
  pricing: string;
  stock_quantity: number;

  constructor() {
    this.clean();
  }

  clean(): void {
    this.name = '';
    this.picture_url = '';
    this.description = '';
    this.sku = -1;
    this.review_grade = '';
    this.pricing = '';
    this.stock_quantity = 0;
  }
}
