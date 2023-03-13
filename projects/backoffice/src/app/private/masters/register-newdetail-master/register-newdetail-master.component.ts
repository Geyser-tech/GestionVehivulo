import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cad-register-newdetail-master',
  templateUrl: './register-newdetail-master.component.html',
  styleUrls: ['./register-newdetail-master.component.scss'],
})
export class RegisterNewdetailMasterComponent implements OnInit {
  masterDetailForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.masterDetailForm = this.fb.group({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      worth: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}
}
