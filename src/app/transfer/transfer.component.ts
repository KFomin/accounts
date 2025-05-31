import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, NgForOf, NgIf} from '@angular/common';
import {Account, ApiService} from '../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-transfer',
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatLabel,
    MatFormField,
    ReactiveFormsModule,
    MatSelect,
    MatOption,
    CurrencyPipe,
    NgForOf,
    MatInput,
    MatButton,
    NgIf,
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent implements OnInit {
  transferForm: FormGroup;
  accounts: Account[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private router: Router
  ) {
    this.transferForm = this.fb.group({
      fromAccount: [null, Validators.required],
      toAccount: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    }, {
      validators: this.accountsNotEqualValidator()
    });
  }

  ngOnInit(): void {
    this.apiService.accounts.subscribe(accounts => {
      this.accounts = accounts;
    })
  }

  homelinkClicked() {
    this.router.navigate(['/']);
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      const fromAccount = this.transferForm.get('fromAccount')?.value;
      const toAccount = this.transferForm.get('toAccount')?.value;
      const amount = this.transferForm.get('amount')?.value;
      const description = this.transferForm.get('description')?.value;

      if (fromAccount && toAccount && amount && description) {
        this.apiService.doTransfer(fromAccount, toAccount, amount, description)
          .subscribe((accounts) => {
            this.apiService.accounts.next(accounts);
            this.snackBar.open('Transfer successful!', 'Close', {duration: 3000});
            this.transferForm.reset();
          });
      }
    }
  }

  private accountsNotEqualValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromAccount = control.get('fromAccount')?.value;
      const toAccount = control.get('toAccount')?.value;

      if (fromAccount && toAccount && fromAccount === toAccount) {
        return {
          accountsEqual: true
        };
      }

      return null;
    };
  }
}
