import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { LojasComponent } from './lojas/lojas.component';

const routes: Routes = [
  { path: 'vendas', component: VendasComponent },
  { path: '', component: VendasComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'vendedor', component: VendedorComponent },
  { path: 'lojas', component: LojasComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
