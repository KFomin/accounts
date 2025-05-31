import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from '@angular/material/card';
import {CurrencyPipe, NgForOf} from '@angular/common';

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
    MatButton
  ],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.scss'
})
export class TransferComponent {
  transferForm: FormGroup;
  accounts = [
    {id: 1, name: 'Main Account', balance: 1500},
    {id: 2, name: 'Savings Account', balance: 5000},
  ];

  constructor(private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.transferForm = this.fb.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.transferForm.valid) {
      this.snackBar.open('Transfer successful!', 'Close', {duration: 3000});
      this.transferForm.reset();
    }
  }
}
