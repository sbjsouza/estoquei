export class Vendas {
    product: string;
    sku: number;
    id: number;
    value: string;
    quantity: number;
    data: string;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.product = '';
      this.sku = 0;
      this.id = 0;
      this.quantity = 0;
      this.value = '';
      this.data = '';
    }
  }
  