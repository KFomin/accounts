import {Component, HostListener, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle, MatCardTitleGroup} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {AsyncPipe, CurrencyPipe, NgIf, NgTemplateOutlet} from '@angular/common';
import {Account, ApiService} from '../api.service';
import {BehaviorSubject} from 'rxjs';
import {MatIcon} from '@angular/material/icon';


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
    CurrencyPipe,
    MatCardTitleGroup,
    AsyncPipe,
    MatIcon,
    MatIconButton,
    NgTemplateOutlet,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  dataSource = new MatTableDataSource<Account>([]);
  viewType: BehaviorSubject<'mobile' | 'desktop'> = new BehaviorSubject<'mobile' | 'desktop'>('desktop')

  desktopColumns: string[] = ['name', 'iban', 'balance', 'transactions', 'transfer'];

  mobileColumns: string[] = ['iban', 'balance', 'expand'];
  expandedAccount: Account | null = null;

  constructor(
    private router: Router,
    private apiService: ApiService,
  ) {
  }

  isExpanded(account: Account) {
    return this.expandedAccount?.id === account.id;
  }

  toggleExpanded(account: Account) {
    this.expandedAccount = this.isExpanded(account) ? null : account;
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: number) {
    if (width > 1279) {
      this.viewType.next('desktop');
      return;
    }
    this.viewType.next('mobile');
  }

  ngOnInit(): void {
    if (document.documentElement.clientWidth < 1280) {
      this.viewType.next('mobile');
    }
    this.apiService.accounts.subscribe(accounts => {
      this.dataSource.data = accounts;
    })
  }

  viewTransactions(accountId: number): void {
    this.router.navigate(['/transactions', accountId]);
  }

  transferMoneyClicked(accountId: number): void {
    this.router.navigate(['/transfer'], {queryParams: {fromAccountId: accountId}});
  }
}
