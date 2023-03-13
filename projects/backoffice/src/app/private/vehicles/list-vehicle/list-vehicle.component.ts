import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import jwt_decode from 'jwt-decode';
import { JwtService } from '@cad-core/services';
import { RegisterVehicleComponent } from '../register-vehicle/register-vehicle.component';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { ShowVehicleComponent } from '../show-vehicle/show-vehicle.component';

@Component({
  selector: 'cad-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.scss'],
})
export class ListVehicleComponent implements OnInit {
  checkOnlyRead: boolean = false;

  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';

  viewTitle: string;
  // table
  data: any[] = [];
  columns: any[];
  actions: any[];

  // filter
  areas: any[];
  brands: any[];
  vehicleTypes: any[];
  vehicleStates: any[];
  pipStates: any[];
  vehicleInspections: any[];
  registerStates: any[];

  getDataFromSeach: boolean;
  areasFiltered: any[];
  brandsFiltered: any[];
  vehicleTypesFiltered: any[];
  vehicleStatesFiltered: any[];
  pipStatesFiltered: any[];
  vehicleInspectionsFiltered: any[];
  registerStatesFiltered: any[];

  //Parameter
  UserOnlyRead: string;

  constructor(public dialog: MatDialog, private vehicleService: VehicleService, private jwtService: JwtService) {
    this.viewTitle = 'Vehículos';
    this.columns = [
      { field: 'area', header: 'ÁREA' },
      { field: 'type', header: 'TIPO' },
      { field: 'licensePlate', header: 'PLACA' },
      { field: 'brand', header: 'MARCA' },
      { field: 'model', header: 'MODELO' },
      { field: 'year', header: 'AÑO' },
      { field: 'pipPolicy', header: 'SOAT' },
      { field: 'registrationState', header: 'ESTADO-REGISTRO' },
      { field: 'state', header: 'ESTADO-VEHÍCULO' },
    ];
    this.actions = [1, 0, 0];
    this.vehicleService.listen().subscribe((m: any) => {
      this.getAllVehicles();
    });
  }

  ngOnInit(): void {
    this.getAllVehicles();
    this.GetSettings();
  }
  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  openRegister() {
    const dialogRef = this.dialog.open(RegisterVehicleComponent, { disableClose: true });
    dialogRef.backdropClick();
  }

  searchEvent($event: number) {
    const searchModal = this.dialog.open(ShowVehicleComponent, {
      disableClose: true,
      data: {
        Id: $event,
      },
    });
    searchModal.backdropClick();
  }

  getAllVehicles() {
    const queryParams = { pageSize: this.PAGE_SIZE_DEFAULT, pageNumber: this.PAGE_NUMBER_DEFAULT };
    this.vehicleService.getAllvehicles().subscribe(res => {
      this.data = res;
      this.data.map(vehicle => {
        if (vehicle.pipPolicy == null) {
          vehicle.pipPolicy = 'Sin SOAT';
        }
      });
    });
  }

  GetSettings() {
    this.vehicleService.getAllSettingsList().subscribe(res => {
      this.areas = res.data.areas;
      this.brands = res.data.brands;
      this.pipStates = res.data.pipState;
      this.registerStates = res.data.registerState;
      this.vehicleStates = res.data.vehicleState;
      this.vehicleTypes = res.data.vehicleTypes;
      this.vehicleInspections = res.data.vehicleInspection;
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();
    });
  }

  searchData() {
    const searchData = {
      areas: this.areasFiltered,
      brands: this.brandsFiltered,
      vehicleTypes: this.vehicleTypesFiltered,
      vehicleState: this.vehicleStatesFiltered,
      pipStates: this.pipStatesFiltered,
      vehicleInspections: this.vehicleInspectionsFiltered,
      registerStates: this.registerStatesFiltered,
      pageNumber: '1',
      pageSize: '30',
    };
    this.vehicleService.getVehiclesBySearch(searchData).subscribe(res => {
      this.data = res.items;
    });
  }

  selectedAreas($event) {
    this.areasFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedBrands($event) {
    this.brandsFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedVehicleTypes($event) {
    this.vehicleTypesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedVehicleStates($event) {
    this.vehicleStatesFiltered = $event.map(item => {
      return item.id;
    });
  }

  selectedPipStates($event) {
    this.pipStatesFiltered = $event.map(item => {
      return item.value;
    });
  }

  selectedVehicleInspections($event) {
    this.vehicleInspectionsFiltered = $event.map(item => {
      return item.value;
    });
  }

  selectedRegisterStates($event) {
    this.registerStatesFiltered = $event.map(item => {
      return item.value;
    });
  }

  clearFilters() {
    this.areas = null;
    this.brands = null;
    this.pipStates = null;
    this.registerStates = null;
    this.vehicleStates = null;
    this.vehicleTypes = null;
    this.vehicleInspections = null;
    this.GetSettings();
    this.getAllVehicles();
  }
}
