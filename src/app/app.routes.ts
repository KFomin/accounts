import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TransactionsComponent} from './transactions/transactions.component';
import {TransferComponent} from './transfer/transfer.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard', // default navigation from root to /dashboard
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'transactions/:accountId', // accountId for transactions filtering
    component: TransactionsComponent
  },
  {
    path: 'transfer',
    component: TransferComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
