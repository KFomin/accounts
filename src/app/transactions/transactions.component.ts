import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {
  MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup
} from '@angular/material/card';
import {CurrencyPipe, DatePipe} from '@angular/common';
import {ApiService, Transaction} from '../api.service';
import {BehaviorSubject} from 'rxjs';
import {MatButton} from '@angular/material/button';


@Component({
  selector: 'app-transactions',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatHeaderCellDef,
    MatCellDef,
    DatePipe,
    CurrencyPipe,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRowDef,
    MatRow,
    MatCardTitleGroup,
    MatButton
  ],
  templateUrl: './transactions.component.html',
  styleUrl: './transactions.component.scss'
})
export class TransactionsComponent implements OnInit {
  displayedColumns: string[] = ['date', 'description', 'amount', 'type'];
  transactions: BehaviorSubject<Transaction[]> = new BehaviorSubject<Transaction[]>([]);
  dataSource = new MatTableDataSource<Transaction>([]);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.transactions.subscribe((transactions: Transaction[]) => {
      this.dataSource.data = transactions;
    })

    const accountId = Number(this.route.snapshot.paramMap.get('accountId'));

    if (accountId) {
      this.apiService.getTransactions(accountId)
        .subscribe((transactions) => {
            this.transactions.next(transactions);
          }
        )
    }
  }

  homelinkClicked() {
    this.router.navigate(['/']);
  }
}
