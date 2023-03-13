import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { MessagingService } from '@cad-core/services';
import { FuelSupplyDetailContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-detail.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RegisterDetailMasterRecursiveComponent } from '@cad-private/masters/register-detail-master-recursive/register-detail-master-recursive.component';
import { FuelSupplyService } from '../shared/services/fuel-supply-service.service';
import { FuelPriceService } from '../shared/services/fuel-price-service.service';

@Component({
  selector: 'cad-register-fuel-supplies',
  templateUrl: './register-fuel-supplies.component.html',
  styleUrls: ['./register-fuel-supplies.component.scss'],
  providers: [DatePipe],
})
export class RegisterFuelSuppliesComponent implements OnInit {
  form!: FormGroup;
  arrayForm!: FormGroup;
  vehicle: GetVehicleByLicensePlate;

  Date = new Date(new Date());
  currentDate = this.datePipe.transform(this.Date, 'dd-MM-yyyy');
  currentTime = `${this.Date.getHours()}:${this.Date.getMinutes()}`;

  fuelSpplyForm: FormGroup;
  fuelSupliesConcept: any[] = [];
  driver: any[] = [];
  area: any[] = [];
  arrayTable: any[] = [];
  value: any;
  contract: any[] = [];

  concept: any[] = [];
  conceptTemporal: any[] = [];
  tableFuelSupply: any[] = [];
  total: number = 0;
  disable: boolean = true;

  // parameter
  areaMasterIdParameter: number;

  constructor(
    private _fb: FormBuilder,
    private vehicleService: VehicleService,
    private _translate: TranslateService,
    private messageService: MessagingService,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
    private fuelSupplyService: FuelSupplyService,
    private priceFuelSupply: FuelPriceService,
    private registerFuelSupplyModal: MatDialogRef<RegisterFuelSuppliesComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formFuelSupply();
  }

  ngOnInit(): void {
    this.form.patchValue({ dispachDate: this.Date });
    this.form.patchValue({ dispatchTime: this.currentTime });
    this.form.controls.areaId.disable();
    this.form.controls.contractId.disable();
    this.form.controls.driverId.disable();
    this.form.controls.concept.disable();
  }

  formFuelSupply() {
    this.arrayForm = this._fb.group({});

    const formControls = {
      vehicleId: new FormControl('', [Validators.required]),
      driverId: new FormControl('', [Validators.required]),
      contractId: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.maxLength(20)]),
      areaId: new FormControl('', [Validators.required]),
      odometer: new FormControl('', [Validators.required]),
      dispatchNote: new FormControl('', [Validators.required, Validators.pattern(/^([0-9])*$/)]),
      dispachDate: new FormControl('', [Validators.required]),
      dispatchHour: new FormControl('', [Validators.required]),
      concept: new FormControl('', []),
      arrayConcept: this._fb.array([]),
    };

    this.form = this._fb.group(formControls);
    this.fuelSupplyService.listen().subscribe(res => {
      this.getSettingsToCreateFuelSypply(this.vehicle.id);
    });
  }

  get array() {
    return this.form.get('arrayConcept') as FormArray;
  }

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

  // Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getSettingsToCreateFuelSypply(vehicleId: number) {
    this.fuelSupplyService.getAllSettingsList(vehicleId).subscribe(response => {
      const { areas } = response.data;
      const { drivers } = response.data;
      const { contracts } = response.data;
      this.driver = response.data.driver;
      this.areaMasterIdParameter = response.data.areaMasterIdParameter;
      this.area = areas;
      this.contract = contracts;
      this.driver = drivers;
      this.form.controls.contractId.enable();
      this.form.controls.driverId.enable();
      this.area.length > 0 ? this.form.controls.areaId.enable() : this.form.controls.areaId.disable();
      if (this.contract.length > 0) {
        this.form.controls.contractId.enable();
        this.form.controls.concept.enable();
      } else {
        this.form.controls.contractId.disable();
        this.form.controls.concept.disable();
      }
    });
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.form.controls.vehicleId.setValue(res.data.id);
        this.contract = [];
        this.conceptTemporal = [];
        this.array.controls = [];
        this.getSettingsToCreateFuelSypply(this.vehicle.id);
      },
      error => {
        $event.controls.vehicleId.setValue('');
        $event.controls.concept.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }

  changeContract(id) {
    const queryParams = { contractId: id, fuelTypeId: this.vehicle.fuelType, areaId: this.vehicle.areaId };
    if (this.form.controls.contractId.value != '') {
      this.priceFuelSupply.getAllPriceFuelSupplyByContractId(queryParams).subscribe(resp => {
        this.setConceptByContractId(resp);
      });
      this.concept = [];
    }
  }

  setConceptByContractId(data) {
    this.concept = data;
    this.contract.forEach(x => (x.contractDetails = this.concept));
    this.concept.length > 0 ? this.form.controls.areaId.enable() : this.form.controls.areaId.disable();
    this.conceptTemporal = [];
    this.array.controls = [];
    this.concept.forEach(item => {
      this.conceptTemporal.push(item);
    });
  }

  addConcept(event) {
    this.conceptTemporal.forEach((item, index) => {
      if (item.id == event.value) {
        this.array.push(
          this._fb.group({
            conceptId: new FormControl(item.conceptId, [Validators.required]),
            conceptName: new FormControl(item.conceptName, [Validators.required]),
            quantity: new FormControl(1, [Validators.required]),
            unitPrice: new FormControl(item.unitPrice, [Validators.required]),
            amount: new FormControl(item.unitPrice * 1, [Validators.required]),
          })
        );

        this.conceptTemporal.splice(index, 1);
        this.form.controls.concept.setValue('');
      }
    });
    this.calcTotal();
  }

  saveFuelSupply() {
    this.form.controls.areaId.enable();
    for (let i = 0; i < this.array.length; i++) {
      this.arrayTable.push({
        fuelSupplyId: 0,
        conceptId: this.array.at(i).value.conceptId,
        quantity: this.array.at(i).value.quantity,
        unitPrice: this.array.at(i).value.unitPrice,
        amount: this.array.at(i).value.amount,
      });
    }
    const fuelSupply: any = {
      vehicleId: this.form.value.vehicleId,
      driverId: this.form.value.driverId,
      contractId: this.form.value.contractId,
      userAreaId: this.form.value.areaId,
      odometer: this.form.value.odometer,
      dispatchNote: this.form.value.dispatchNote,
      dispachDate: this.datePipe.transform(this.form.value.dispachDate, 'YYYY-MM-dd'),
      dispatchHour: this.form.value.dispatchHour,
      fuelSupplyDetail: this.arrayTable,
    };
    if (this.form.valid && this.array.controls.length != 0) {
      this.fuelSupplyService.add(fuelSupply).subscribe(
        resp => {
          this._msgService.success('FUEL_SUPPLIES.MESSAGES.ADD.SUCCESS', 'FUEL_SUPPLIES.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerFuelSupplyModal.close();
          this.fuelSupplyService.filter('Register!');
        },
        error => {
          this._msgService.error(error.error.message, 'FUEL_SUPPLIES.MESSAGES.ADD.FAILED_TITLE');
          this.conceptTemporal = [];
          this.arrayTable = [];
        }
      );
    }
  }

  removeData(id) {
    const data = this.array.controls[id].value;
    this.concept.forEach(item => {
      if (item.id == data.conceptId) {
        this.conceptTemporal.push(item);
      }
    });

    this.array.removeAt(id);
    this.calcTotal();
  }

  removeObjectWithId(arr, id) {
    const objWithIdIndex = arr.findIndex(obj => obj.item === id);

    if (objWithIdIndex > -1) {
      arr.splice(objWithIdIndex, 1);
    }
    return arr;
  }

  changeQuantity(i) {
    this.total = 0;
    this.array.controls[i].patchValue({
      amount: this.array.at(i).value.quantity * this.array.at(i).value.unitPrice,
    });
    this.calcTotal();
  }

  changeUnitPrice(i) {
    this.array.controls[i].patchValue({
      amount: this.array.at(i).value.quantity * this.array.at(i).value.unitPrice,
    });
    this.calcTotal();
  }

  changeAmount(i) {
    this.array.controls[i].patchValue({
      quantity: this.array.at(i).value.amount / this.array.at(i).value.unitPrice,
    });
    this.calcTotal();
  }

  calcTotal() {
    this.total = 0;
    if (this.array.controls.length) {
      for (let i = 0; i < this.array.controls.length; i++) {
        this.total += this.array.at(i).value.amount;
      }
    }
  }

  createMasterDetailUserArea($event) {
    $event.preventDefault();
    const registerAreaModal = this.dialog.open(RegisterDetailMasterRecursiveComponent, {
      disableClose: true,
      data: {
        MasterId: this.areaMasterIdParameter,
        UserAreaId: this.vehicle.areaId,
      },
    });
  }
}
