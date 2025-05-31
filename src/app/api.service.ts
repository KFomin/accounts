import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';

export interface Transaction {
  date: Date;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
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

  createTransaction(transaction: Transaction): Observable<any> {
    return this.http.post(`${this.apiUrl}/transactions`, transaction);
  }

  createAccount(account: Account): Observable<any> {
    return this.http.post(`${this.apiUrl}/accounts`, account);
  }

  deleteAccount(accountId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/accounts/${accountId}`);
  }
}
