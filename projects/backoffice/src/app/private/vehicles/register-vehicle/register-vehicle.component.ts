import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RegisterDetailMasterComponent } from '@cad-private/masters/register-detail-master/register-detail-master.component';
import { Vehicle } from '../shared/interfaces/vechicle.interface';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { MasterDetailService } from '@cad-private/masters/shared/services/master-detail.service';

import { MessagingService } from '@cad-core/services';

@Component({
  selector: 'cad-register-vehicle',
  templateUrl: './register-vehicle.component.html',
  styleUrls: ['./register-vehicle.component.scss'],
})
export class RegisterVehicleComponent implements OnInit {
  actualYearValue: number;
  minYearValue: number;
  vehicleForm: FormGroup;
  years: number[] = [];

  //Parameters
  fuelTypeMasterId: number;
  brandMasterId: number;
  assignedAreaMasterId: number;
  modelMasterId: number;
  vehicleTypeMasterId: number;
  engineTypeMasterId: number;
  stateVehicleActive: number;

  fuelTypeMasters: any[] = [];
  brandMasters: any[] = [];
  assignedAreaMasters: any[] = [];
  modelMasters: any[] = [];
  vehicleTypeMasters: any[] = [];
  engineTypeMasters: any[] = [];
  belongTypeMasters: any[] = [];

  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective;

  constructor(
    private fb: FormBuilder,
    private vechicleService: VehicleService,
    private masterDetailService: MasterDetailService,
    public dialog: MatDialog,
    private registerVehicleModal: MatDialogRef<RegisterVehicleComponent>,
    private _msgService: MessagingService
  ) {
    this.actualYearValue = new Date().getFullYear();
    this.minYearValue = this.actualYearValue - 50;
    this.vehicleForm = this.fb.group({
      licensePlate: new FormControl('', [Validators.required, Validators.pattern(/^([A-Za-z,0-9,-]){6}$/)]),
      assignedArea: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      belongingType: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      vehicleType: new FormControl('', [Validators.required]),
      year: new FormControl(this.actualYearValue, [Validators.required]),
      fuelType: new FormControl('', [Validators.required]),
      engineType: new FormControl('', [Validators.required]),
      color: new FormControl('', [Validators.required, Validators.pattern(/^\s*[a-zA-Z,\s]+\s*$/)]),
      engineNumber: new FormControl('', [Validators.required, Validators.pattern('[A-Z0-9]*')]),
      serialNumber: new FormControl('', [Validators.required, Validators.pattern(/^([A-Z,0-9]){14}$|^([A-Z,0-9]){17}$/)]),
      factoryConsumptionRange: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])/)]),
    });
  }
  ngOnInit(): void {
    this.setYears();
    this.vechicleService.getAllSettings().subscribe(res => {
      this.fuelTypeMasters = res.data.fueltypes;
      this.brandMasters = res.data.brands;
      this.assignedAreaMasters = res.data.areas;
      this.modelMasters = res.data.models;
      this.vehicleTypeMasters = res.data.vehicleTypes;
      this.engineTypeMasters = res.data.engineTypes;
      this.belongTypeMasters = res.data.belongingTypes;

      this.stateVehicleActive = res.data.stateVehicleActiveParameter;
      this.brandMasterId = res.data.brandMasterId;
      this.engineTypeMasterId = res.data.engineTypeMasterId;
      this.fuelTypeMasterId = res.data.fuelTypeMasterId;
      this.modelMasterId = res.data.modelMasterId;
      this.vehicleTypeMasterId = res.data.vehicleTypeMasterId;
      this.assignedAreaMasterId = res.data.areaMasterId;
    });
  }
  saveVehicle() {
    const vehicle: Vehicle = {
      AreaId: this.vehicleForm.controls.assignedArea.value,
      BrandId: this.vehicleForm.controls.brand.value,
      Color: this.vehicleForm.controls.color.value,
      EngineNumber: this.vehicleForm.controls.engineNumber.value,
      FuelTypeId: this.vehicleForm.controls.fuelType.value,
      LicensePlate: this.vehicleForm.controls.licensePlate.value,
      ModelId: this.vehicleForm.controls.model.value,
      SerialNumber: this.vehicleForm.controls.serialNumber.value,
      TypeId: this.vehicleForm.controls.vehicleType.value,
      Year: this.vehicleForm.controls.year.value,
      EngineTypeId: this.vehicleForm.controls.engineType.value,
      StateId: this.stateVehicleActive,
      Observation: '',
      BelongingId: this.vehicleForm.controls.belongingType.value,
      FactoryConsumptionRange: this.vehicleForm.controls.factoryConsumptionRange.value,
    };
    if (this.vehicleForm.valid) {
      this.vechicleService.add(vehicle).subscribe(
        res => {
          this._msgService.success('VEHICLES.MESSAGES.ADD.SUCCESS', 'VEHICLES.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerVehicleModal.close();
          this.vechicleService.filter('Registered!');
        },
        error => {
          console.log(error);

          this._msgService.error(error.error.title, 'VEHICLES.MESSAGES.ADD.FAILED_TITLE');
        }
      );
    }
  }

  setYears() {
    for (var i = this.actualYearValue; i >= this.minYearValue; i--) {
      this.years.push(i);
    }
  }
  CreateMasterDetailBrand($event) {
    $event.preventDefault();
    const registerBrandModal = this.dialog.open(RegisterDetailMasterComponent, {
      disableClose: true,
      data: {
        MasterId: this.brandMasterId,
      },
    });
    registerBrandModal.backdropClick();
    registerBrandModal.afterClosed().subscribe(result => {
      this.masterDetailService.getMasterDetailsById(this.brandMasterId).subscribe(res => {
        this.brandMasters = res.items;
      });
    });
  }
  CreateMasterDetailModel($event) {
    $event.preventDefault();
    const registerModelModal = this.dialog.open(RegisterDetailMasterComponent, {
      disableClose: true,
      data: {
        MasterId: this.modelMasterId,
      },
    });
    registerModelModal.backdropClick();
    registerModelModal.afterClosed().subscribe(result => {
      this.masterDetailService.getMasterDetailsById(this.modelMasterId).subscribe(res => {
        this.modelMasters = res.items;
      });
    });
  }
  CreateMasterDetailVehicleType($event) {
    $event.preventDefault();
    const registerVehicleTypeModal = this.dialog.open(RegisterDetailMasterComponent, {
      disableClose: true,
      data: {
        MasterId: this.vehicleTypeMasterId,
      },
    });
    registerVehicleTypeModal.backdropClick();
    registerVehicleTypeModal.afterClosed().subscribe(result => {
      this.masterDetailService.getMasterDetailsById(this.vehicleTypeMasterId).subscribe(res => {
        this.vehicleTypeMasters = res.items;
      });
    });
  }
}
