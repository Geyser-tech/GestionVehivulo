import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { RegisterDetailMasterComponent } from '@cad-private/masters/register-detail-master/register-detail-master.component';
import { MasterDetailService } from '@cad-private/masters/shared/services/master-detail.service';
import { ToastrService } from 'ngx-toastr';
import { ConfirmEditDialogComponent } from 'projects/ui-components/src/lib/confirm-edit-dialog/confirm-edit-dialog.component';
import { RegisterVehicleComponent } from '../register-vehicle/register-vehicle.component';
import { updateVehicleCommand } from '../shared/interfaces/update-vehicle-coomand.interface';
import { Vehicle } from '../shared/interfaces/vechicle.interface';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { ShowVehicleComponent } from '../show-vehicle/show-vehicle.component';

@Component({
  selector: 'cad-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.scss'],
})
export class EditVehicleComponent implements OnInit {
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
  belongTypeMasters:any[]=[];


  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vechicleService: VehicleService,
    private masterDetailService: MasterDetailService,
    public dialog: MatDialog,
    private registerVehicleModal: MatDialogRef<ShowVehicleComponent>,

    private _msgService: MessagingService
  ) {
    this.actualYearValue = new Date().getFullYear();
    this.minYearValue = this.actualYearValue - 50;
    console.log(this.data.vehicle);
    this.vehicleForm = this.fb.group({
      licensePlate: new FormControl(this.data.vehicle.licensePlate, [
        Validators.required,
        Validators.pattern(/^([A-Za-z,0-9,-]){6}$/),
      ]),
      factoryConsumptionRange: new FormControl(this.data.vehicle.factoryConsumptionRange, [Validators.required]),
      assignedArea: new FormControl('', [Validators.required]),
      brand: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      vehicleType: new FormControl('', [Validators.required]),
      year: new FormControl(this.data.vehicle.year, [Validators.required]),
      fuelType: new FormControl('', [Validators.required]),
      engineType: new FormControl('', [Validators.required]),
      belongingType: new FormControl('', [Validators.required]),
      color: new FormControl(this.data.vehicle.color, [Validators.required, Validators.pattern(/^\s*[a-zA-Z,\s]+\s*$/)]),
      engineNumber: new FormControl(this.data.vehicle.engineNumber, [Validators.required, Validators.pattern(/^([A-Z,0-9])/)]),
      serialNumber: new FormControl(this.data.vehicle.serialNumber, [
        Validators.required,
        Validators.pattern(/^([A-Z,0-9]){14}$|^([A-Z,0-9]){17}$/),
      ]),
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
      this.stateVehicleActive = res.data.stateVehicleActiveParameter;
      this.brandMasterId = res.data.brandMasterId;
      this.engineTypeMasterId = res.data.engineTypeMasterId;
      this.fuelTypeMasterId = res.data.fuelTypeMasterId;
      this.modelMasterId = res.data.modelMasterId;
      this.vehicleTypeMasterId = res.data.vehicleTypeMasterId;
      this.assignedAreaMasterId = res.data.areaMasterId;

      this.belongTypeMasters = res.data.belongingTypes;

      this.setDefaultValueMasters('brand', this.brandMasters, this.data.vehicle.brand);
      this.setDefaultValueMasters('model', this.modelMasters, this.data.vehicle.model);
      this.setDefaultValueMasters('assignedArea', this.assignedAreaMasters, this.data.vehicle.area);
      this.setDefaultValueMasters('vehicleType', this.vehicleTypeMasters, this.data.vehicle.type);
      this.setDefaultValueMasters('fuelType', this.fuelTypeMasters, this.data.vehicle.fuelType);
      this.setDefaultValueMasters('engineType', this.engineTypeMasters, this.data.vehicle.engineType);
      this.setDefaultValueMasters('belongingType', this.belongTypeMasters, this.data.vehicle.belonging);
      this.vehicleForm.controls['licensePlate'].disable();
    });
  }
  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.vehicleForm.get(nameControl).setValue(toSelect.id);
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
  saveEditVechicle() {
    const vehicle: updateVehicleCommand = {
      Id: this.data.vehicle.id,
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
      FactoryConsumptionRange:this.vehicleForm.controls.factoryConsumptionRange.value,
      BelongingId:this.vehicleForm.controls.belongingType.value
    };
    if (this.vehicleForm.valid) {
      this.vechicleService.updateVehicle(vehicle).subscribe(
        res => {
          this._msgService.success('VEHICLES.MESSAGES.UPDATE.SUCCESS', 'VEHICLES.MESSAGES.UPDATE.SUCCESS_TITLE');
          this.registerVehicleModal.close();
        },
        error => {
          this._msgService.error(error.error.message, 'VEHICLES.MESSAGES.UPDATE.FAILED_TITLE');
        }
      );
    }
  }
}
