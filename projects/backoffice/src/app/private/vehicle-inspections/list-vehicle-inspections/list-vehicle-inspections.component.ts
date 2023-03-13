import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShowVehicleInspectionsComponent } from '../show-vehicle-inspections/show-vehicle-inspections.component';
import { RegisterVehicleInspectionsComponent } from '../register-vehicle-inspections/register-vehicle-inspections.component';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { ShowHistoryVehicleInspectionsComponent } from '../show-history-vehicle-inspections/show-history-vehicle-inspections.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';

@Component({
  selector: 'cad-list-vehicle-inspections',
  templateUrl: './list-vehicle-inspections.component.html',
  styleUrls: ['./list-vehicle-inspections.component.scss'],
  providers: [DatePipe],
})
export class ListVehicleInspectionsComponent implements OnInit {
  checkOnlyRead: boolean = false;
  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  minDate = new Date(new Date().getFullYear() - 1, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);

  private STATE_EXPIRE: string = 'Por Caducar';
  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  pipStateActiveParameter: number;
  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;

  data: any[] = [];
  columns: any[];
  actions: any[];

  states: any[];
  areas: any[];
  providers: any[];

  getDataFromSeach: boolean;
  areasFiltered: any[];
  providersFiltered: any[];
  statesFiltered: any[];
  dateStart: Date;
  dateEnd: Date;
  form!: FormGroup;
  //Parameter
  UserOnlyRead: string;

  constructor(
    public dialog: MatDialog,
    private vehicleInspectionsService: VehicleInspectionsService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private jwtService: JwtService
  ) {
    this.columns = [
      { field: 'daysToBeat', header: 'DÍAS PARA VENCER' },
      { field: 'area', header: 'ÁREA' },
      { field: 'provider', header: 'EMPRESA' },
      { field: 'certificateNumber', header: 'Nº CERTIFICADO' },
      { field: 'licencePlate', header: 'PLACA' },
      { field: 'type', header: 'TIPO' },
      { field: 'stateString', header: 'ESTADO' },
    ];
    this.actions = [1, 0, 0];
    this.vehicleInspectionsService.listen().subscribe((m: any) => {
      this.getAllVehicleInspections();
    });
  }

  ngOnInit(): void {
    this.getAllVehicleInspections();
    this.GetSettings();
    this.inputDate();
  }

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  inputDate() {
    const formControls = {
      startDate: new FormControl('', []),
      EndDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
  }

  searchEvent($event: number) {
    const searchModal = this.dialog.open(ShowVehicleInspectionsComponent, {
      data: {
        id: $event,
      },
      disableClose: true,
    });
    searchModal.backdropClick();
    searchModal.afterClosed().subscribe(result => {
      this.getAllVehicleInspections();
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterVehicleInspectionsComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getAllVehicleInspections();
    });
  }

  openShow($event: number): void {
    const dialogRef = this.dialog.open(ShowVehicleInspectionsComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getAllVehicleInspections();
    });
  }

  openShowHistory(): void {
    const dialogRef = this.dialog.open(ShowHistoryVehicleInspectionsComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  getAllVehicleInspections() {
    this.vehicleInspectionsService.getAll().subscribe(res => {
      this.data = res;
      this.data.map(x => this.setStateVehicleInspection(x));
    });
  }

  setStateVehicleInspection(vehicleInspection: any) {
    if (vehicleInspection.state == 'PorVencer') {
      vehicleInspection.stateString = this.STATE_EXPIRE;
    } else if (vehicleInspection.state == 'Caducado') {
      vehicleInspection.stateString = this.STATE_LAPSED;
    } else vehicleInspection.stateString = this.STATE_ACTIVE;
  }

  GetSettings() {
    this.vehicleInspectionsService.getAllSettingsList().subscribe(res => {
      this.areas = res.data.area;
      this.providers = res.data.provider;
      this.states = res.data.state;
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
    });
  }

  selectedAreas($event) {
    this.areasFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedProviders($event) {
    this.providersFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedStates($event) {
    this.statesFiltered = $event.map(function (a) {
      return a.value;
    });
  }

  searchData() {
    let searchData;
    if (this.form.controls.startDate.value == '') {
      searchData = {
        areas: this.areasFiltered,
        providers: this.providersFiltered,
        stateVehicleInspection: this.statesFiltered,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.form.controls.startDate.value != '') {
      searchData = {
        areas: this.areasFiltered,
        providers: this.providersFiltered,
        stateVehicleInspection: this.statesFiltered,
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.EndDate),
        pageNumber: '1',
        pageSize: '30',
      };
    }

    this.vehicleInspectionsService.getVehicleInspectionsBySearch(searchData).subscribe(res => {
      this.data = res.items;
      this.data.map(x => this.setStateVehicleInspection(x));
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
    this.areas = null;
    this.providers = null;
    this.states = null;
    this.form.controls.startDate.setValue('');
    this.form.controls.EndDate.setValue('');
    this.GetSettings();
    this.getAllVehicleInspections();
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.startDate < d;
  };

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }
}
