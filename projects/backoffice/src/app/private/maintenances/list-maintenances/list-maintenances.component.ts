import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowHistoryVehicleMaintenanceComponent } from '../show-history-vehicle-maintenance/show-history-vehicle-maintenance.component';
import { RegisterMaintenancesComponent } from '../register-maintenances/register-maintenances.component';
import { ShowMaintenancesComponent } from '../show-maintenances/show-maintenances.component';
import { MaintenancesService } from '../shared/services/maintenances-service.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cad-list-maintenances',
  templateUrl: './list-maintenances.component.html',
  styleUrls: ['./list-maintenances.component.scss'],
  providers: [DatePipe],
})
export class ListMaintenancesComponent implements OnInit {
  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  data: any[] = [];
  columns: any[];
  actions: any[];
  typeMaintenance: any[];
  vehicles: any[];

  vehiclesFiltered: any[];
  typeMaintenanceFiltered: any[];
  form!: FormGroup;

  constructor(
    public dialog: MatDialog,
    private _maintenancesService: MaintenancesService,
    private datePipe: DatePipe,
    private _fb: FormBuilder
  ) {
    this.getAllSettingsToList();
    this.getAllMaintenance();
    this.inputDate();
  }

  ngOnInit(): void {
    this.data = ELEMENT_DATA;
  }

  inputDate() {
    const formControls = {
      startDate: new FormControl('', []),
      EndDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
  }

  getAllSettingsToList() {
    this._maintenancesService.getAllSettingsToList().subscribe(response => {
      this.typeMaintenance = response.data.typeMaintenance;
      this.vehicles = response.data.vehicles;
    });
  }

  getAllMaintenance() {
    const queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
    this._maintenancesService.getAll(queryParams).subscribe(response => {
      this.data = response;
      this.data.map(maintenance => {
        maintenance.maintenanceDate = this.datePipe.transform(maintenance.maintenanceDate, 'dd-MM-YYYY');
        maintenance.nextMaintenanceDate = this.datePipe.transform(maintenance.nextMaintenanceDate, 'dd-MM-YYYY');
      });
    });
    this.columns = [
      { field: 'maintenanceDate', header: 'FECHA DE MANTENIMIENTO' },
      { field: 'nextMaintenanceDate', header: 'PROX MANTENIMIENTO' },
      { field: 'vehicle', header: 'VEHÍCULO' },
      { field: 'typeMaintenance', header: 'TIPO DE MANTENIMIENTO' },
      { field: 'amount', header: 'MONTO TOTAL' },
    ];
    this.actions = [1, 0, 0];
  }

  openShowHistory(): void {
    const dialogRef = this.dialog.open(ShowHistoryVehicleMaintenanceComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterMaintenancesComponent, { disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      this.getAllMaintenance();
    });
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowMaintenancesComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getAllMaintenance();
    });
  }

  selectedVehicles($event) {
    this.vehiclesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedTypeMaintenances($event) {
    this.typeMaintenanceFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  searchData() {
    let searchData;
    if (this.form.controls.startDate.value == '') {
      searchData = {
        vehicles: this.vehiclesFiltered,
        typeMaintenance: this.typeMaintenanceFiltered,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.form.controls.startDate.value != '') {
      searchData = {
        vehicles: this.vehiclesFiltered,
        typeMaintenance: this.typeMaintenanceFiltered,
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.EndDate),
        pageNumber: '1',
        pageSize: '30',
      };
    }

    this._maintenancesService.getMaintenancesBySearch(searchData).subscribe(res => {
      this.data = res.items;
      this.data.map(maintenance => {
        maintenance.maintenanceDate = this.datePipe.transform(maintenance.maintenanceDate, 'dd-MM-YYYY');
        maintenance.nextMaintenanceDate = this.datePipe.transform(maintenance.nextMaintenanceDate, 'dd-MM-YYYY');
      });
    });
  }

  validaDate(value): Date {
    var responseDate;
    if (value != null) {
      responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
    }
    return responseDate;
  }

  clearFilters() {
    this.getAllMaintenance();
  }

  // getAllMaintenances() {
  //   let queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
  //   this._maintenancesService.getAll(queryParams).subscribe(res => {
  //     this.data = res;
  //   });
  // }
}

export interface maintenance {
  id?: number;
  DateMaintenance: string;
  NextMaintenance: string;
  Vehicle: string;
  TypeMaintenance: string;
  TotalAmount: string;
}

const ELEMENT_DATA: maintenance[] = [
  {
    id: 10,
    DateMaintenance: '14/12/2022',
    NextMaintenance: '14/03/2023',
    Vehicle: 'AIU-056',
    TypeMaintenance: 'PREVENTIVO',
    TotalAmount: '50005',
  },
  {
    id: 11,
    DateMaintenance: '18/12/2022',
    NextMaintenance: '10/02/2023',
    Vehicle: 'UAO-236',
    TypeMaintenance: 'CORRECTIVO',
    TotalAmount: '10001',
  },
];
