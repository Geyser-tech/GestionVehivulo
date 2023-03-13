/* eslint-disable no-return-assign */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { MasterService } from '../shared/services/master.service';
import { RegisterMastersComponent } from '../register-masters/register-masters.component';
import { EditMastersComponent } from '../edit-masters/edit-masters.component';
import { ShowMasterComponent } from '../show-master/show-master.component';

@Component({
  selector: 'cad-list-masters',
  templateUrl: './list-masters.component.html',
  styleUrls: ['./list-masters.component.scss'],
})
export class ListMastersComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[];

  [x: string]: any;

  constructor(private masterService: MasterService, private _translate: TranslateService, public dialog: MatDialog) {
    this.dataInitial();
  }

  ngOnInit(): void {
    // this.masterService.getCustomersMedium().then(data => (this.data = data));
  }

  dataInitial() {
    this.columns = [
      { field: 'code', header: this.getTranslation('MASTER.MASTER_TITLE.CODE') },
      { field: 'name', header: this.getTranslation('MASTER.MASTER_TITLE.NAME') },
    ];
    this.actions = [1, 1, 0];

    this.masterService.getAll().subscribe(response => {
      this.data = response.items;
    });
  }

  registerMasters(): void {
    const dialogRef = this.dialog.open(RegisterMastersComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editMasters($event: number) {
    const dialogRef = this.dialog.open(EditMastersComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }

  showMaster($event: number) {
    const dialogRef = this.dialog.open(ShowMasterComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
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

  // traductor
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
