import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';
import { RegisterMobilityRequestComponent } from '../register-mobility-request/register-mobility-request.component';
import { MobilityRequestService } from '../shared/services/mobilityRequest-service.service';
import { ShowMobilityRequestComponent } from '../show-mobility-request/show-mobility-request.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'cad-list-mobility-request',
  templateUrl: './list-mobility-request.component.html',
  styleUrls: ['./list-mobility-request.component.scss'],
  providers: [DatePipe],
})
export class ListMobilityRequestComponent implements OnInit {
  checkOnlyRead: boolean = false;

  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';

  //table
  data: any[] = [];
  columns: any[];
  actions: any[];

  //filter
  userAreas: any[] = [];
  vehicles: any[] = [];
  drivers: any[] = [];

  getDataFromSeach: boolean;
  userAreasFiltered: any[];
  vehiclesFiltered: any[];
  driversFiltered: any[];

  dateStart: Date;
  dateEnd: Date;
  form!: FormGroup;

  //Parameter
  UserOnlyRead: string;

  constructor(
    public dialog: MatDialog,
    private movilityRequestService: MobilityRequestService,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private jwtService: JwtService
  ) {
    this.columns = [
      { field: 'serviceNumber', header: 'N° DE SOLICITUD' },
      { field: 'userArea', header: 'ÁREA USUARIA' },
      { field: 'vehicle', header: 'VEHÍCULO' },
      { field: 'driver', header: 'CONDUCTOR' },
      { field: 'commissionedStaff', header: 'PERSONAL COMISIONADO' },
      { field: 'registrationState', header: 'ESTADO-REGISTRO' },
    ];
    this.actions = [1, 0, 0];
    this.movilityRequestService.listen().subscribe((m: any) => {
      this.getAll();
    });
  }

  ngOnInit(): void {
    this.getAll();
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
    let today = new Date();
    let DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
    const formControls = {
      startDate: new FormControl(new Date(new Date()), []),
      EndDate: new FormControl(new Date(today.getTime() + DAY_IN_MILLISECONDS), []),
    };
    this.form = this._fb.group(formControls);
  }

  GetSettings() {
    this.movilityRequestService.getAllSettings().subscribe(res => {
      this.userAreas = res.data.userAreas;
      this.drivers = res.data.drivers;
      this.vehicles = res.data.vehicles.map(vehicle => {
        vehicle.name = vehicle.licensePlate;
        return vehicle;
      });
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
    });
  }

  getAll() {
    const queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
    this.movilityRequestService.getAll().subscribe(res => {
      this.data = res;
    });
  }
  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterMobilityRequestComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openShow($event: number): void {
    const searchModal = this.dialog.open(ShowMobilityRequestComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    searchModal.backdropClick();
    searchModal.afterClosed().subscribe(result => {
      this.getAll();
    });
  }

  searchData() {
    let searchData;
    if (this.form.controls.startDate.value == '') {
      searchData = {
        userAreas: this.userAreasFiltered,
        drivers: this.driversFiltered,
        vehicles: this.vehiclesFiltered,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.form.controls.startDate.value != '') {
      searchData = {
        userAreas: this.userAreasFiltered,
        drivers: this.driversFiltered,
        vehicles: this.vehiclesFiltered,
        dateStart: this.validaDate(this.form.value.startDate),
        dateEnd: this.validaDate(this.form.value.EndDate),
        pageNumber: '1',
        pageSize: '30',
      };
    }
    this.movilityRequestService.getMobilityRequestsBySearch(searchData).subscribe(res => {
      this.data = res.items;
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
    this.userAreas = null;
    this.drivers = null;
    this.vehicles = null;
    this.GetSettings();
    this.getAll();
  }

  selectedUserAreas($event) {
    this.userAreasFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  selectedDrivers($event) {
    this.driversFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  selectedVehicles($event) {
    this.vehiclesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.startDate < d;
  };

  clearEndDate() {
    this.form.controls['EndDate'].setValue('');
  }
}

export interface mobility {
  NRequest: string;
  UserArea: string;
  Vehicle: string;
  Driver: string;
  commissionaryStaff: string;
}

const ELEMENT_DATA: mobility[] = [
  {
    NRequest: '0010-2022',
    UserArea: 'MINISTRA',
    Vehicle: 'AIU-056',
    Driver: 'CURI RIOS FERNANDO',
    commissionaryStaff: 'LIDIA ENCISO',
  },
];
