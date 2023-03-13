/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MasterService } from '../shared/services/master.service';
import { RegisterNewdetailMasterComponent } from '../register-newdetail-master/register-newdetail-master.component';
import { EditDetailMasterComponent } from '../edit-detail-master/edit-detail-master.component';
import { RegisterDetailMasterComponent } from '../register-detail-master/register-detail-master.component';

@Component({
  selector: 'cad-show-master',
  templateUrl: './show-master.component.html',
  styleUrls: ['./show-master.component.scss'],
})
export class ShowMasterComponent implements OnInit {
  columns: any[];
  actions: any[];
  dataMaestrodetaller: any[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private _router: Router,
    private _masterService: MasterService,
    private _translate: TranslateService
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  dataInitial() {
    this.columns = [
      { field: 'code', header: this.getTranslation('MASTER.MASTER_TITLE.CODE') },
      { field: 'name', header: this.getTranslation('MASTER.MASTER_TITLE.NAME') },
      { field: 'value', header: this.getTranslation('MASTER.MASTER_DETAIL.WORTH') },
    ];
    this.actions = [0, 1, 0];

    this._masterService.getAllMasterDetailByMaster(this.data.Id).subscribe(response => {
      this.dataMaestrodetaller = response;
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

  registerDetailMaster() {
    const dialogRef = this.dialog.open(RegisterDetailMasterComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }

  editDetailMaster(id: number) {
    const dialogRef = this.dialog.open(EditDetailMasterComponent, {
      disableClose: true,
      data: {
        Id: id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }

  // traductor
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
}
