export class Vendas {
    product: string;
    sku: number;
    id_vendedor: number;
    valor: string;
    quantity: number;
    data: string;
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.product = '';
      this.sku = 0;
      this.id_vendedor = 0;
      this.quantity = 0;
      this.valor = '';
      this.data = '';
    }
  }
  