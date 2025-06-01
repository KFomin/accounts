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
import {ActivatedRoute, Router} from '@angular/router';

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
  paramAccountId: number | undefined;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private apiService: ApiService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.transferForm = this.fb.group({
      fromAccount: [null, Validators.required],
      toAccount: [null, Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    }, {
      validators: [
        this.accountsNotEqualValidator(),
        this.amountTooBigValidator()
      ]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.paramAccountId = params['fromAccountId'];
    })

    this.apiService.accounts.subscribe(accounts => {
      this.accounts = accounts;

      let preselectedFrom = this.accounts.find(a => a.id === this.paramAccountId);

      // select "from" account by queryParam
      if (preselectedFrom) {
        this.transferForm.controls['fromAccount'].setValue(preselectedFrom);
      }

    })
  }

  homelinkClicked() {
    this.router.navigate(['/']);
  }

  // here I take all the values from form to immitate backend behaviour in next steps
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
            this.router.navigate(['/']);
            this.transferForm.reset();
          });
      }
    }
  }

  // We don't want our amount to be bigger that balance.
  private amountTooBigValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const fromAccount = control.get('fromAccount')?.value;
      const amount = control.get('amount')?.value;

      if (fromAccount && amount && fromAccount.balance < amount) {
        return {
          amountTooBig: true
        };
      }

      return null;
    };
  }

  // No need to transfer money around 1 account :)
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
