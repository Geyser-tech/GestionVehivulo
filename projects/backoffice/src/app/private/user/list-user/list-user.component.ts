/* eslint-disable no-console */
/* eslint-disable no-return-assign */
/* eslint-disable import/no-extraneous-dependencies */
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../shared/services/user.service';
import { RegisterUserComponent } from '../register-user/register-user.component';
import { ShowRolComponent } from '../show-rol/show-rol.component';
import { ShowUserComponent } from '../show-user/show-user.component';

@Component({
  selector: 'cad-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss'],
})
export class ListUserComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[];
  [x: string]: any;

  constructor(private userservice: UserService, private _translate: TranslateService, private dialog: MatDialog) {
    this.columns = [
      { field: 'funcionaries', header: this.getTranslation('USERS.DATA.USER_FUNCIONARIES') },
      { field: 'user', header: this.getTranslation('USERS.DATA.USERS') },
      { field: 'rol', header: this.getTranslation('USERS.DATA.USER_ROLE') },
      { field: 'state', header: this.getTranslation('USERS.DATA.USER_STATE') },
    ];
    this.actions = [1, 0, 0];
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

  createUser(): void {
    const dialogRef = this.dialog.open(RegisterUserComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  roles: any[] = [{ name: 'Administrador' }, { name: 'Secretaria' }, { name: 'Gerente' }];

  addUser(): void {
    const dialogRef = this.dialog.open(ShowRolComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showUser() {
    const dialogRef = this.dialog.open(ShowUserComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {
    this.userservice.getUsers().then(data => (this.data = data));
  }

  // traductor
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
