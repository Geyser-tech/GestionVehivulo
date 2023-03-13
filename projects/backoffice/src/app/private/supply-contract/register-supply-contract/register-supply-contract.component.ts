/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'cad-register-supply-contract',
  templateUrl: './register-supply-contract.component.html',
  styleUrls: ['./register-supply-contract.component.scss'],
})
export class RegisterSupplyContractComponent implements OnInit {
  // FORM INPUT
  contractForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contractForm = this.fb.group({
      contractNumber: new FormControl('', Validators.required),
      concept: new FormControl('', Validators.required),
      ruc: new FormControl('', Validators.required),
      direction: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });
  }

  searchEvent($event: any) {
    console.log(`search ${$event}`);
  }

  editEvent($event: any) {
    console.log(`edit ${$event.value}`);
  }

  deleteEvent($event: any) {
    console.log(`delete ${$event.value}`);
  }

  ngOnInit(): void {}
}
