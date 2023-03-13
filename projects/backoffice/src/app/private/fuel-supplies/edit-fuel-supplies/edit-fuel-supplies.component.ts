import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { RegisterDetailMasterRecursiveComponent } from '@cad-private/masters/register-detail-master-recursive/register-detail-master-recursive.component';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmEditDialogComponent } from 'projects/ui-components/src/lib/confirm-edit-dialog/confirm-edit-dialog.component';
import { RegisterFuelSuppliesComponent } from '../register-fuel-supplies/register-fuel-supplies.component';
import { FuelPriceService } from '../shared/services/fuel-price-service.service';
import { FuelSupplyService } from '../shared/services/fuel-supply-service.service';

@Component({
  selector: 'cad-edit-fuel-supplies',
  templateUrl: './edit-fuel-supplies.component.html',
  styleUrls: ['./edit-fuel-supplies.component.scss'],
  providers: [DatePipe],
})
export class EditFuelSuppliesComponent implements OnInit {
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

  //parameter
  areaMasterIdParameter:number;


  vehicleObj:any;
  fuelSupply:any;
  fuelSupplyDetails:any;

  drivers: any[] = [];
  areas: any[] = [];
  contracts: any[] = [];

  validateNewPrice:boolean;


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
    public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
    this.getFuelSupplyById();
    this.validateNewPrice=true;
  }

  formFuelSupply() {
    this.arrayForm = this._fb.group({});
    const formControls = {
      driverId: new FormControl(this.fuelSupply.driverId, [Validators.required]),
      contractId: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$'), Validators.maxLength(20)]),
      areaId: new FormControl(this.fuelSupply.areaId, [Validators.required]),
      odometer: new FormControl(this.fuelSupply.odometer, [Validators.required]),
      dispatchNote: new FormControl(this.fuelSupply.dispatchNote, [Validators.required]),
      dispachDate: new FormControl(this.fuelSupply.dispachDate, [Validators.required]),
      dispatchHour: new FormControl(this.datePipe.transform(this.fuelSupply.dispachDate, 'hh:mm'), [Validators.required]),
      concept: new FormControl('', []),
      arrayConcept: this._fb.array([]),
    };

    this.form = this._fb.group(formControls);
    this.fuelSupplyService.listen().subscribe(res=>{
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

  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  getSettingsToCreateFuelSypply(vehicleId:number) {
    this.fuelSupplyService.getAllSettingsList(vehicleId).subscribe(response => {
      const areas = response.data.areas;
      const drivers = response.data.drivers;
      const contracts= response.data.contracts;
      this.driver = response.data.driver
      this.areaMasterIdParameter = response.data.areaMasterIdParameter;
      this.area =areas;
      this.contract= contracts;
      this.driver=drivers;
      this.form.controls.contractId.enable();
      this.form.controls.driverId.enable();
      this.area.length>0? this.form.controls.areaId.enable():this.form.controls.areaId.disable();
      if(this.contract.length>0){
        this.form.controls.contractId.enable()
        this.form.controls.concept.enable();
      }else {
        this.form.controls.contractId.disable();
        this.form.controls.concept.disable();
      }
      this.setDefaultValueMasters('areaId', this.area, this.fuelSupply.area);
     this.setDefaultValueMastersById('contractId', this.contract, this.fuelSupply.contractId);
      this.setDefaultValueMastersById('driverId', this.driver, this.fuelSupply.driverId);
      this.SetContractInitial();
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
  SetContractInitial() {
    let queryParams = { contractId: this.fuelSupply.contractId, fuelTypeId: this.vehicleObj.fuelTypeId, areaId: this.vehicleObj.areaId };
    if (this.form.controls.contractId.value != '') {
      this.priceFuelSupply.getAllPriceFuelSupplyByContractId(queryParams).subscribe(resp => {     
        this.concept=[];
        this.conceptTemporal=[];
        resp.map(x=>{
          this.concept.push(x);
          console.log(x);
        });
        this.addConceptInitial(resp);
      });
    }
  }

  changeContract(id) {
    this.clearFormArray(this.array);
    let queryParams = { contractId: id, fuelTypeId: this.vehicleObj.fuelTypeId, areaId: this.vehicleObj.areaId };
    if (this.form.controls.contractId.value != '') {
      this.priceFuelSupply.getAllPriceFuelSupplyByContractId(queryParams).subscribe(resp => {
        this.concept=[];
        this.conceptTemporal=[];
        resp.map(x=>{
         this.concept.push(x);
          this.conceptTemporal.push(x);
        });
      });
    }
  }

  clearFormArray = (formArray: FormArray) => {
    while (formArray.length !== 0) {
      formArray.removeAt(0)
    }
  }

  setConceptByContractId(data) {
   this.conceptTemporal=data;
    this.concept=data;
    this.concept.length>0? this.form.controls.areaId.enable():this.form.controls.areaId.disable();
  }
  addConceptInitial(fuelSupplyPriceAvailability:any) {
    this.fuelSupplyDetails.map((fuelSupplyDetail, index)=>{this.array.push(
      this._fb.group({
        conceptId: new FormControl(fuelSupplyDetail.conceptId, [Validators.required]),
        conceptName: new FormControl(fuelSupplyDetail.conceptName, [Validators.required]),
        quantity: new FormControl(fuelSupplyDetail.quantity , [Validators.required]),
        actualPrice: new FormControl(fuelSupplyDetail.actualPrice),
        unitPrice: new FormControl(fuelSupplyDetail.unitPrice, [Validators.required]),
        amount: new FormControl(fuelSupplyDetail.amount  , [Validators.required]),
        id: new FormControl(fuelSupplyDetail.id, [Validators.required]),
      })        
    );   
   });

    this.conceptTemporal=fuelSupplyPriceAvailability;
    this.fuelSupplyDetails.map((fuelSupplyDetail, index)=>{
      this.conceptTemporal.map((availability,index)=>{ 
        if(fuelSupplyDetail.conceptId==availability.conceptId){
          this.conceptTemporal.splice(index, 1);
        }
      })
    });
    this.calcTotal();

   
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
            id: new FormControl(item.id, [Validators.required]),
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
        id:this.array.at(i).value.id
      });
    }
    const fuelSupply: any = {
      id:this.fuelSupply.id,
      driverId: this.form.value.driverId,
      contractId: this.form.value.contractId,
      userAreaId: this.form.value.areaId,
      odometer: this.form.value.odometer,
      dispatchNote: this.form.value.dispatchNote,
      dispachDate: this.datePipe.transform(this.form.value.dispachDate, 'YYYY-MM-dd'),
      dispatchHour: this.form.value.dispatchHour,
      fuelSupplyDetails: this.arrayTable,
    };
    console.log(fuelSupply);
    if (this.form.valid && this.array.controls.length != 0) {
      const command={
        UpdateFuelSupplyDTO:fuelSupply
      }
      this.fuelSupplyService.updateFuelSupplyById(command).subscribe(resp => {
       this._msgService.success('FUEL_SUPPLIES.MESSAGES.UPDATE.SUCCESS','FUEL_SUPPLIES.MESSAGES.UPDATE.SUCCESS_TITLE');
       this.registerFuelSupplyModal.close();  
       this.fuelSupplyService.filter('Register!');                 
      }, error=>{
        this._msgService.error(error.error.message,'FUEL_SUPPLIES.MESSAGES.UPDATE.FAILED_TITLE');
        this.conceptTemporal=[];
        this.arrayTable=[];
      });
    }
  }

  removeData(id) {
    const data = this.array.controls[id].value;
    this.concept.forEach(item => {
      if (item.conceptId == data.conceptId) {
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
      amount: this.array.at(i).value.quantity * this.array.at(i).value.unitPrice
    });
    this.calcTotal();
  }

  changeAmount(i) {
    this.array.controls[i].patchValue({
      quantity: this.array.at(i).value.amount / this.array.at(i).value.unitPrice,
    });
    this.calcTotal();
    return;
  }

  calcTotal() {
    this.total = 0;
    if (this.array.controls.length) {
      for (let i = 0; i < this.array.controls.length; i++) {
        this.total = this.total + this.array.at(i).value.amount;
      }
    }
  }
  createMasterDetailUserArea($event){
    $event.preventDefault();
    const registerAreaModal = this.dialog.open(RegisterDetailMasterRecursiveComponent, {
      disableClose: true,
      data: {
         MasterId: this.areaMasterIdParameter,
         UserAreaId: this.vehicle.areaId,
      },
    });
  }

  getFuelSupplyById(){
    this.fuelSupplyService.getFuelSupplyById(this.data.fuelSupplyId).subscribe(response => {
      this.vehicleObj= response.data.vehicle;
      this.fuelSupply=response.data.fuelSupply;
      this.fuelSupplyDetails=response.data.fuelSupplyDetails;
      this.total=response.data.total;
      this.getSettingsToCreateFuelSypply(this.vehicleObj.id)
      this.formFuelSupply();

    });
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }

  setDefaultValueMastersById(nameControl: string, masterDetails: any[], id: number) {
    const toSelect = masterDetails.find(c => c.id == id);
    this.form.get(nameControl).setValue(toSelect.id);
  }
}
