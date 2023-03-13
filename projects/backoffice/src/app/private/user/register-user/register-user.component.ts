/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cad-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss'],
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  selectSecurityRole: string;
  selectAreas: string;
  selectFuncionaries: string;
  formVisibility = false;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
      securityRole: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      funcionary: new FormControl('', [Validators.required]),
    });
  }

  securityRole: role[] = [
    { value: 'Admin GOBAL', viewValue: 'Admin. GOBAL' },
    { value: 'Admin AREA', viewValue: 'Admin. AREA' },
    { value: 'Lector AREA', viewValue: 'Lector AREA' },
  ];

  areas: area[] = [
    { value: 'OGA', viewValue: 'OGA' },
    { value: 'OGA A', viewValue: 'OGA' },
  ];

  funcionaries: funcionary[] = [
    { value: 'Josue Acosta', viewValue: 'Josue Acosta' },
    { value: 'Fernando Carrillo', viewValue: 'Fernando Carrillo' },
  ];

  roles: any[] = [{ name: 'Administrador' }, { name: 'Secretaria' }, { name: 'Gerente' }];

  ngOnInit(): void {}

  userVisible() {
    this.formVisibility = true;
    console.log(this.formVisibility);
  }
}
interface role {
  value: string;
  viewValue: string;
}
interface area {
  value: string;
  viewValue: string;
}
interface funcionary {
  value: string;
  viewValue: string;
}
