import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';
import {Account, ApiService} from '../api.service';


@Component({
  selector: 'app-dashboard',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatTable,
    MatHeaderCell,
    MatCell,
    MatColumnDef,
    MatCellDef,
    MatHeaderCellDef,
    MatButton,
    MatHeaderRow,
    MatRow,
    MatHeaderRowDef,
    MatRowDef,
    CurrencyPipe
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  displayedColumns: string[] = ['name', 'iban', 'balance', 'actions'];
  dataSource = new MatTableDataSource<Account>([]);

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {
  }

  ngOnInit(): void {
    this.apiService.accounts.subscribe(accounts => {
      this.dataSource.data = accounts;
    })
    this.apiService.getAccounts().subscribe((data) => {
      this.apiService.accounts.next(data);
    });
  }

  viewTransactions(accountId: number): void {
    this.router.navigate(['/transactions', accountId]);
  }
}
