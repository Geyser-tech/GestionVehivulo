/* eslint-disable no-console */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cad-register-functionaries',
  templateUrl: './register-functionaries.component.html',
  styleUrls: ['./register-functionaries.component.scss'],
})
export class RegisterFunctionariesComponent implements OnInit {
  funcionariesForm: FormGroup;
  selectGender: string;
  selectAreas: string;
  optionTypeContract: string;
  selectSecurityRole: string;
  formVisibility = false;

  constructor(private fb: FormBuilder) {
    this.funcionariesForm = this.fb.group({
      dni: new FormControl('', [Validators.required]),
      lastName: new FormControl(''),
      maternalName: new FormControl(''),
      name: new FormControl(''),
      dateBirth: new FormControl(''),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      adress: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      userEmail: new FormControl('', [Validators.required]),
      userPasword: new FormControl('', [Validators.required]),
      userConfirmaPasword: new FormControl('', [Validators.required]),
      segurityRole: new FormControl('', [Validators.required]),
    });
  }

  genders: gender[] = [
    { value: 'tipo A', viewValue: 'MASCULINO' },
    { value: 'tipo B', viewValue: 'FEMENINO' },
  ];

  areas: area[] = [
    { value: 'OGA', viewValue: 'OGA' },
    { value: 'OGA A', viewValue: 'OGA' },
  ];

  typeContract: string[] = ['Planilla', 'Terceros'];
  roles: any[] = [{ name: 'Administrador' }, { name: 'Secretaria' }, { name: 'Gerente' }];

  securityRole: role[] = [
    { value: 'Admin GOBAL', viewValue: 'Admin. GOBAL' },
    { value: 'Admin AREA', viewValue: 'Admin. AREA' },
    { value: 'Lector AREA', viewValue: 'Lector AREA' },
  ];

  ngOnInit(): void {}

  ShowForm() {
    this.formVisibility = true;
    console.log(this.formVisibility);
  }
}

interface gender {
  value: string;
  viewValue: string;
}
interface area {
  value: string;
  viewValue: string;
}
interface role {
  value: string;
  viewValue: string;
}
