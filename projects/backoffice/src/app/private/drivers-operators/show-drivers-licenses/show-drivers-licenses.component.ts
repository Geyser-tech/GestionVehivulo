import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'cad-show-drivers-licenses',
  templateUrl: './show-drivers-licenses.component.html',
  styleUrls: ['./show-drivers-licenses.component.scss'],
})
export class ShowDriversLicensesComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    dialogRef: MatDialogRef<ShowDriversLicensesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {}
}
