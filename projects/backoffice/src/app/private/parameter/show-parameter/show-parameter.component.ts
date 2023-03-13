/* eslint-disable no-console */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '../shared/services/configuration.service';
import { AddConfigurationParameterComponent } from '../add-configuration-parameter/add-configuration-parameter.component';
import { EditConfigurationParameterComponent } from '../edit-configuration-parameter/edit-configuration-parameter.component';
import { ParameterConfigurationService } from '../shared/services/parameter-configuration.service';

@Component({
  selector: 'cad-show-parameter',
  templateUrl: './show-parameter.component.html',
  styleUrls: ['./show-parameter.component.scss'],
})
export class ShowParameterComponent implements OnInit {
  columns: any[];
  actions: any[];
  listParametersConfigurations: any[];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _parameterConfiguration: ParameterConfigurationService,
    private _translate: TranslateService,
    public dialog: MatDialog
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  dataInitial() {
    this.columns = [
      { field: 'name', header: this.getTranslation('PARAMETER.DATA.NAME') },
      { field: 'type', header: this.getTranslation('PARAMETER.DATA.TYPE') },
      { field: 'description', header: this.getTranslation('PARAMETER.DATA.DESCRIPTION') },
      { field: 'value', header: this.getTranslation('PARAMETER.DATA.WORTH') },
    ];
    this.actions = [0, 1, 0];

    this._parameterConfiguration.getAllParameterConfigurationByConfigurationId(this.data.Id).subscribe(response => {
      this.listParametersConfigurations = response;
    });
  }

  addParameterConfig() {
    const dialogRef = this.dialog.open(AddConfigurationParameterComponent, {
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

  editParameterConfig(id: number) {
    const dialogRef = this.dialog.open(EditConfigurationParameterComponent, {
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
