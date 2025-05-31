import {Component, OnInit} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ApiService} from './api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.apiService.getAccounts().subscribe(accounts => {
      this.apiService.accounts.next(accounts);
    })
  }
}
