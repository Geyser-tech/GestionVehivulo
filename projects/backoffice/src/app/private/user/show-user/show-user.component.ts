/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';

@Component({
  selector: 'cad-show-user',
  templateUrl: './show-user.component.html',
  styleUrls: ['./show-user.component.scss'],
})
export class ShowUserComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  deleteUser(): void {
    const dialogRef = this.dialog.open(DeleteUserComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editUser(): void {
    const dialogRef = this.dialog.open(EditUserComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
