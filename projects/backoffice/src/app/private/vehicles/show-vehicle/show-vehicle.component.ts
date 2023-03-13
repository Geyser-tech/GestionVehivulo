import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditVehicleComponent } from '../edit-vehicle/edit-vehicle.component';
import { GetVehicleByIdQuery } from '../shared/interfaces/get-vehicle-by-id-query.interface';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { UnsuscribeVehicleComponent } from '../unsuscribe-vehicle/unsuscribe-vehicle.component';

@Component({
  selector: 'cad-show-vehicle',
  templateUrl: './show-vehicle.component.html',
  styleUrls: ['./show-vehicle.component.scss'],
})
export class ShowVehicleComponent implements OnInit {
  //Variables
  idVehicle: number;
  statePIP: string;
  stateVehicleInspection: string;
  vehicle: GetVehicleByIdQuery;
  today: Date = new Date();

  checkOnlyRead:boolean =false;

  //Parameters
  UserOnlyRead:string;

  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;
  pipStateActiveParameter: number;

  vehicleInspectionStateExpireParameter: number;
  vehicleInspectionStateLapsedParameter: number;
  vehicleInspectionStateActiveParameter: number;

  private STATE_EXPIRE: string = 'Proximo a Vencer';
  private STATE_LAPSED: string = 'Caducado';
  private STATE_ACTIVE: string = 'Vigente';

  private VEHICLE_INSPECTION_STATE_EXPIRE: string = 'Proximo a Vencer';
  private VEHICLE_INSPECTION_STATE_LAPSED: string = 'Caducado';
  private VEHICLE_INSPECTION_STATE_ACTIVE: string = 'Vigente';

  //Paramters
  registrationStateActiveParameter: number;
  registrationStateUnsuscribeParameter: number;
  maintenanceDates: any[] = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private vehicleService: VehicleService,private jwtService: JwtService
  ) {}

  setCheckRole():boolean{
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    console.log(userRoles);
    if(userRoles.includes(this.UserOnlyRead)){
      return true;
    }else return false;
  }

  ngOnInit(): void {
    this.idVehicle = this.data.Id;
    this.getVehicle();
  }
  getVehicle() {
    this.vehicleService.getVehicleById(this.data.Id).subscribe(res => {
      this.maintenanceDates = res.data.maintenance;
      this.maintenanceDates.map(maintenanceDate => {
        maintenanceDate.maintenanceDate = new Date(maintenanceDate.maintenanceDate);
      });

      console.log(this.maintenanceDates);

      this.vehicle = res.data;

      this.UserOnlyRead=res.data.userOnlyRead;
      this.checkOnlyRead= this.setCheckRole();

      this.pipStateActiveParameter = res.data.pipStateActive;
      this.pipStateExpireParameter = res.data.pipStateExpire;
      this.pipStateLapsedParameter = res.data.pipStateLapsed;

      this.vehicleInspectionStateActiveParameter = res.data.vehicleInspectionStateActive;
      this.vehicleInspectionStateExpireParameter = res.data.vehicleInspectionStateExpire;
      this.vehicleInspectionStateLapsedParameter = res.data.vehicleInspectionStateLapsed;

      this.registrationStateActiveParameter = res.data.registrationStateActive;
      this.registrationStateUnsuscribeParameter = res.data.registrationStateUnsuscribe;

      this.setStatePip();
      this.setVehicleInspectionState();
    });
  }
  editVehicle() {
    const editVehicleModal = this.dialog.open(EditVehicleComponent, {
      disableClose: true,
      data: {
        vehicle: this.vehicle,
      },
    });
    editVehicleModal.backdropClick();
    editVehicleModal.afterClosed().subscribe(result => {
      this.vehicleService.getVehicleById(this.idVehicle).subscribe(res => {
        this.vehicle = res.data;
      });
    });
  }

  unsuscribeVehicle() {
    const unsuscribeVehicleModal = this.dialog.open(UnsuscribeVehicleComponent, {
      disableClose: true,
      width: '40%',
      data: {
        Id: this.idVehicle,
      },
    });
    unsuscribeVehicleModal.backdropClick();
    unsuscribeVehicleModal.afterClosed().subscribe(result => {
      this.vehicleService.getVehicleById(this.idVehicle).subscribe(res => {
        this.vehicle = res.data;
      });
    });
  }

  setStatePip() {
    if (this.vehicle.pipState == this.pipStateExpireParameter) {
      this.statePIP = this.STATE_EXPIRE;
    } else if (this.vehicle.pipState == this.pipStateLapsedParameter) {
      this.statePIP = this.STATE_LAPSED;
    } else this.statePIP = this.STATE_ACTIVE;
  }
  setVehicleInspectionState() {
    if (this.vehicle.vehicleInspectionState == this.vehicleInspectionStateExpireParameter) {
      this.stateVehicleInspection = this.VEHICLE_INSPECTION_STATE_EXPIRE;
    } else if (this.vehicle.vehicleInspectionState == this.vehicleInspectionStateLapsedParameter) {
      this.stateVehicleInspection = this.VEHICLE_INSPECTION_STATE_LAPSED;
    } else this.stateVehicleInspection = this.VEHICLE_INSPECTION_STATE_ACTIVE;
  }
}
