/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../shared/services/user.service';
import { AddRolComponent } from '../add-rol/add-rol.component';

@Component({
  selector: 'cad-show-rol',
  templateUrl: './show-rol.component.html',
  styleUrls: ['./show-rol.component.scss'],
})
export class ShowRolComponent implements OnInit {
  columns: any[];
  actions: any[];
  rol: any[];
  constructor(private dialog: MatDialog, private userservice: UserService, private _translate: TranslateService) {
    this.columns = [{ field: 'rol', header: this.getTranslation('USERS.DATA.USER_ROLE') }];
    this.actions = [0, 0, 1];
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

  ngOnInit(): void {
    this.userservice.getRol().then(rol => {
      this.rol = rol;
    });
  }

  addRol() {
    const dialogRef = this.dialog.open(AddRolComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
