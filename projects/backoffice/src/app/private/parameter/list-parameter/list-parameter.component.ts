/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-return-assign */
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { RegisterParameterComponent } from '../register-parameter/register-parameter.component';
import { EditParameterComponent } from '../edit-parameter/edit-parameter.component';
import { DeleteParameterComponent } from '../delete-parameter/delete-parameter.component';
import { ShowParameterComponent } from '../show-parameter/show-parameter.component';
import { ConfigurationService } from '../shared/services/configuration.service';

@Component({
  selector: 'cad-list-parameter',
  templateUrl: './list-parameter.component.html',
  styleUrls: ['./list-parameter.component.scss'],
})
export class ListParameterComponent implements OnInit {
  columns: any[];
  actions: any[];
  data: any[];
  constructor(
    private _translate: TranslateService,
    private _configurationService: ConfigurationService,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.columns = [
      { field: 'name', header: this.getTranslation('PARAMETER.DATA.NAME') },
      { field: 'description', header: this.getTranslation('PARAMETER.DATA.DESCRIPTION') },
    ];
    this.actions = [1, 1, 1];
  }

  ngOnInit(): void {
    this.dataInitial();
  }

  dataInitial() {
    this._configurationService.getAll().subscribe(response => {
      this.data = response;
    });
  }

  registerParameter(): void {
    const dialogRef = this.dialog.open(RegisterParameterComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.dataInitial();
    });
  }

  editParameter(id: number): void {
    const dialogRef = this.dialog.open(EditParameterComponent, {
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

  deleteParameter(id: number): void {
    const dialogRef = this.dialog.open(DeleteParameterComponent, {
      disableClose: true,
      data: {
        Id: id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showParameter(id: number): void {
    const dialogRef = this.dialog.open(ShowParameterComponent, {
      disableClose: true,
      data: {
        Id: id,
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
