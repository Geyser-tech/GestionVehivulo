import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MobilityRequest } from '../shared/interfaces/mobilityRequest.interface';
import { MobilityRequestService } from '../shared/services/mobilityRequest-service.service';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { TranslateService } from '@ngx-translate/core';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { VehicleAssignmentService } from '@cad-private/vehicles/shared/services/vehicleAssignment-service.service';
import { RegisterDetailMasterRecursiveComponent } from '@cad-private/masters/register-detail-master-recursive/register-detail-master-recursive.component';
import { MasterDetailService } from '@cad-private/masters/shared/services/master-detail.service';

@Component({
  selector: 'cad-register-mobility-request',
  templateUrl: './register-mobility-request.component.html',
  styleUrls: ['./register-mobility-request.component.scss'],
  providers: [DatePipe],
})
export class RegisterMobilityRequestComponent implements OnInit {
  loading: boolean = true;
  userAreaDisable: boolean = true;
  idArea: number = null;
  idAreaAsignada: number;

  form: FormGroup;

  file: any = '';

  vehicle: GetVehicleByLicensePlate;

  UserAreaMasters: any[] = [];
  DriverPeoples: any[] = [];
  ServiceNumber: string;

  labels: any[] = [
    { Label: 'brand', Name: this.getTranslation('PIP.DATA.BRAND') },
    { Label: 'model', Name: this.getTranslation('PIP.DATA.MODEL') },
    { Label: 'year', Name: this.getTranslation('PIP.DATA.YEAR') },
    { Label: 'type', Name: this.getTranslation('PIP.DATA.TYPE') },
    { Label: 'area', Name: this.getTranslation('PIP.DATA.AREA') },
    { Label: 'color', Name: this.getTranslation('PIP.DATA.COLOR') },
    { Label: 'serialNumber', Name: this.getTranslation('PIP.DATA.SERIE') },
    { Label: 'engineNumber', Name: this.getTranslation('PIP.DATA.N_ENGINE') },
  ];

  constructor(
    private messageService: MessagingService,
    private vehicleService: VehicleService,
    private fb: FormBuilder,
    private mobilityRequestService: MobilityRequestService,
    private _translate: TranslateService,
    public dialog: MatDialog,
    private registerMobilityRequestModal: MatDialogRef<RegisterMobilityRequestComponent>,
    private _msgService: MessagingService,
    private datePipe: DatePipe,
    private vehicleAssignmentService: VehicleAssignmentService,
    private masterDetailService: MasterDetailService
  ) {
    this.form = this.fb.group({
      licensePlate: new FormControl('', [Validators.required]),
      userArea: new FormControl('', [Validators.required]),
      commissionaryStaff: new FormControl('', [Validators.required]),
      dateService: new FormControl('', [Validators.required]),
      hourService: new FormControl('', [Validators.required]),
      commissionGoal: new FormControl('', [Validators.required]),
      assignedDriver: new FormControl('', [Validators.required]),
      departureTime: new FormControl('', [Validators.required]),
      arrivalTime: new FormControl('', [Validators.required]),
      departureKM: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      arrivalKM: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      entity: new FormControl('', [Validators.required]),
      district: new FormControl('', [Validators.required]),
      observation: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.mobilityRequestService.getAllSettings().subscribe(res => {
      this.DriverPeoples = res.data.drivers;
      this.ServiceNumber = res.data.serviceNumber;
      this.idAreaAsignada = res.data.areaAsignadaId;
      console.log(res.data);
    });
  }

  save(): void {
    this.loading = false;
    const mobilityRequest: MobilityRequest = {
      VehicleId: this.vehicle.id,
      ServiceNumber: this.ServiceNumber,
      AreaId: this.form.value.userArea,
      CommissionedStaff: this.form.value.commissionaryStaff,
      ServiceDate: this.datePipe.transform(this.form.value.dateService, 'YYYY-MM-dd  HH:MM:SS'),
      ServiceHour: this.form.value.hourService,
      Objective: this.form.value.commissionGoal,
      DriverId: this.form.value.assignedDriver,
      DepartureTime: this.form.value.departureTime,
      ArrivalTime: this.form.value.arrivalTime,
      DepartureKM: this.form.value.departureKM,
      ArrivalKM: this.form.value.arrivalKM,
      Entity: this.form.value.entity,
      District: this.form.value.district,
      Observation: this.form.value.observation,
      Address: this.form.value.address,
      Document: this.form.value.document,
    };

    if (this.form.valid) {
      this.mobilityRequestService.add(mobilityRequest).subscribe(
        res => {
          this.loading = true;
          this._msgService.success('MOBILITY_REQUEST.MESSAGES.ADD.SUCCESS_TITLE', 'MOBILITY_REQUEST.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerMobilityRequestModal.close();
          this.mobilityRequestService.filter('Registered!');
        },
        error => {
          this.loading = true;
          this._msgService.error(error.error.title, 'MOBILITY_REQUEST.MESSAGES.ADD.FAILED_TITLE');
        }
      );
    }
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.form.controls['licensePlate'].setValue($event.controls.licensePlate.value);
        this.userAreaDisable = false;
        this.idArea = res.data.areaId;
        this.vehicleAssignmentService.GetSettingsByIdArea(this.idArea).subscribe(
          res => {
            this.UserAreaMasters = res.data.userAreas;
          },
          error => {
            this._msgService.error(error.error.message, 'MOBILITY_REQUEST.MESSAGES.USER_AREA.FAILED');
          }
        );
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }

  CreateMasterDetailArea($event) {
    $event.preventDefault();
    const registerAreaModal = this.dialog.open(RegisterDetailMasterRecursiveComponent, {
      disableClose: true,
      data: {
        MasterId: this.idAreaAsignada,
        UserAreaId: this.idArea,
      },
    });
    registerAreaModal.backdropClick();
    registerAreaModal.afterClosed().subscribe(result => {
      this.vehicleAssignmentService.GetSettingsByIdArea(this.idArea).subscribe(res => {
        this.UserAreaMasters = res.data.userAreas;
      });
    });
  }

  receiveDocument(event) {
    this.form.controls['document'].setValue(event.newDocument);
  }
}
