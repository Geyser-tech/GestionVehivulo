/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
/* eslint-disable no-return-assign */
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { RegisterPreventiveMaintenanceCatalogComponent } from '../register-preventive-maintenance-catalog/register-preventive-maintenance-catalog.component';
import { catalogService } from '../shared/services/preventive-maintenance-catalog.services';
import { ShowPreventiveMaintenanceCatalogComponent } from '../show-preventive-maintenance-catalog/show-preventive-maintenance-catalog.component';

@Component({
  selector: 'cad-list-preventive-maintenance-catalog',
  templateUrl: './list-preventive-maintenance-catalog.component.html',
  styleUrls: ['./list-preventive-maintenance-catalog.component.scss'],
  providers: [DatePipe],
})
export class ListPreventiveMaintenanceCatalogComponent implements OnInit {
  data: any[] = [];
  columns: any[];
  actions: any[];

  //Masters
  statesMaster: any[];
  catalogMaintenanceClassesMaster: any[];

  //Parameters
  catalogMaintenanceStateActiveParameter: number;
  catalogMaintenanceLapsedParameter: number;
  //Filters
  classFiltered: any[];
  statesFiltered: any[];
  fromDate: Date;
  toDate: Date;

  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  constructor(
    public dialog: MatDialog,
    private catalogservice: catalogService,
    private _translate: TranslateService,
    private datePipe: DatePipe
  ) {
    this.columns = [
      { field: 'issueDate', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.FROM_DATE') },
      { field: 'toDate', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.TO_DATE') },
      { field: 'maintenanceClass', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.CLASS') },
      { field: 'engineType', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.ENGINE_TYPE') },
      { field: 'version', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.VERSION') },
      { field: 'stateString', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.TABLE.STATE') },
    ];
    this.actions = [1, 0, 0];
    this.catalogservice.listen().subscribe(res => {
      this.catalogMaintenanceClassesMaster = null;
      this.statesMaster = null;
      this.getSettingstoList();
    });
  }
  ngOnInit(): void {
    this.getSettingstoList();
    this.getAllCatalogMaintenances();
  }

  getSettingstoList() {
    this.catalogservice.getSettingsToList().subscribe(res => {
      this.statesMaster = res.data.states;
      this.catalogMaintenanceClassesMaster = res.data.maintenanceClass;
      this.catalogMaintenanceStateActiveParameter = res.data.catalogMaintenanceStateActive;
      this.catalogMaintenanceLapsedParameter = res.data.catalogMaintenanceStateLapsed;
      this.fromDate = res.data.fromDateDefualt;
      this.toDate = res.data.toDateDefault;
      this.getAllCatalogMaintenances();
    });
  }
  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterPreventiveMaintenanceCatalogComponent, { disableClose: true });
  }

  searchEvent($event): void {
    const dialogRef = this.dialog.open(ShowPreventiveMaintenanceCatalogComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
  }

  getAllCatalogMaintenances() {
    this.catalogservice.getAllCatalogs().subscribe(res => {
      res.items.map(x => {
        x.issueDate = this.datePipe.transform(x.issueDate, 'dd/MM/YYYY');
        x.toDate = this.datePipe.transform(x.toDate, 'dd/MM/YYYY');
      });
      this.data = res.items;
      this.data.map(x => this.setStateCatalogMaintenance(x));
    });
  }

  setStateCatalogMaintenance(pip: any) {
    if (pip.state == this.catalogMaintenanceStateActiveParameter) {
      pip.stateString = this.STATE_ACTIVE;
    } else {
      pip.stateString = this.STATE_LAPSED;
    }
  }

  selectedCatalogMaintenanceClasses($event) {
    this.classFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  selectedCatalogMaintenancesStates($event) {
    this.statesFiltered = $event.map(item => {
      return item.value;
    });
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
  filter() {
    let filter = {
      FromDate: this.datePipe.transform(this.fromDate, 'YYYY/MM/dd'),
      ToDate: this.datePipe.transform(this.toDate, 'YYYY/MM/dd'),
      MaintenanceClasses: this.classFiltered,
      CatalogMaintenancesStates: this.statesFiltered,
    };
    this.catalogservice.filterCatalogMaintenances(filter).subscribe(res => {
      this.data = res.items;
      res.items.map(x => {
        x.issueDate = this.datePipe.transform(x.issueDate, 'dd/MM/YYYY');
        x.toDate = this.datePipe.transform(x.toDate, 'dd/MM/YYYY');
      });
      this.data.map(x => this.setStateCatalogMaintenance(x));
    });
  }

  clearFilters() {
    this.catalogMaintenanceClassesMaster = null;
    this.statesMaster = null;
    this.getSettingstoList();
    this.getAllCatalogMaintenances();
  }

  clearDateEnd() {
    this.toDate = null;
  }

  filterDateEnd = (d: Date): boolean => {
    return this.fromDate < d;
  };
}
