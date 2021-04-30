import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendasComponent } from './vendas/vendas.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { VendedorComponent } from './vendedor/vendedor.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'vendas', component: VendasComponent },
  { path: '', component: VendasComponent },
  { path: 'produtos', component: ProdutosComponent },
  { path: 'vendedor', component: VendedorComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
