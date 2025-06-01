import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
}

interface TransactionData extends Transaction {
  accountId: number;
}

export interface Account {
  id: number;
  name: string;
  iban: string;
  balance: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000';

  accounts: BehaviorSubject<Account[]> = new BehaviorSubject<Account[]>([]);

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${this.apiUrl}/accounts`);
  }

  getTransactions(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions?accountId=${accountId}`);
  }

  createTransaction(transaction: TransactionData): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction);
  }

  updateAccount(account: Account): Observable<any> {
    return this.http.put(`${this.apiUrl}/accounts/${account.id}`, account);
  }

  // Here I immitate backend behaviour, by creating/updating stuff in our database
  doTransfer(fromAccount: Account, toAccount: Account, amount: number, description: string): Observable<Account[]> {
    const nowDate = new Date(Date.now());
    const transactionData = {
      date: nowDate,
      description: description,
      amount: amount
    };

    fromAccount.balance -= amount;
    toAccount.balance += amount;

    this.updateAccount(fromAccount).subscribe(() => {
      console.log('From account updated:', fromAccount);
    });

    this.updateAccount(toAccount).subscribe(() => {
      console.log('To account updated:', toAccount);
    });

    this.createTransaction({ ...transactionData, accountId: fromAccount.id, type: 'debit' }).subscribe(() => {
      console.log('Debit transaction created');
    });

    this.createTransaction({ ...transactionData, accountId: toAccount.id, type: 'credit' }).subscribe(() => {
      console.log('Credit transaction created');
    });

    return this.getAccounts();
  }
}
