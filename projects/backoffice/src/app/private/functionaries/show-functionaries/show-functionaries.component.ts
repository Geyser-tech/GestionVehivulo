/* eslint-disable no-console */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteFunctionariesComponent } from '../delete-functionaries/delete-functionaries.component';
import { EditFunctionariesComponent } from '../edit-functionaries/edit-functionaries.component';

@Component({
  selector: 'cad-show-functionaries',
  templateUrl: './show-functionaries.component.html',
  styleUrls: ['./show-functionaries.component.scss'],
})
export class ShowFunctionariesComponent implements OnInit {
  showForm: FormGroup;

  constructor(private dialog: MatDialog, private _router: Router, private fb: FormBuilder) {
    this.showForm = this.fb.group({
      observation: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  deleteFuncionaries(): void {
    const dialogRef = this.dialog.open(DeleteFunctionariesComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editFuncionaries(): void {
    const dialogRef = this.dialog.open(EditFunctionariesComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
