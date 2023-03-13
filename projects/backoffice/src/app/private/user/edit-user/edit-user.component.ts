/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserDeleteConfirmationComponent } from '../user-delete-confirmation/user-delete-confirmation.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'cad-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
})
export class EditUserComponent implements OnInit {
  userForm: FormGroup;
  selectAreas: string;
  selectFuncionaries: string;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.userForm = this.fb.group({
      area: new FormControl(''),
      funcionary: new FormControl(''),
      rol: new FormControl(''),
    });
  }

  areas: area[] = [
    { value: 'OGA', viewValue: 'OGA' },
    { value: 'OGA A', viewValue: 'OGA' },
  ];

  funcionaries: funcionary[] = [
    { value: 'Josue Acosta', viewValue: 'Josue Acosta' },
    { value: 'Fernando Carrillo', viewValue: 'Fernando Carrillo' },
  ];

  roles: any[] = [{ name: 'Administrador' }, { name: 'Secretaria' }, { name: 'Gerente' }];

  confirmationUser(): void {
    const dialogRef = this.dialog.open(UserDeleteConfirmationComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
interface area {
  value: string;
  viewValue: string;
}
interface funcionary {
  value: string;
  viewValue: string;
}
