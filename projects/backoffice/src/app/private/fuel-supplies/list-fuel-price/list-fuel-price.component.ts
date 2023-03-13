import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterFuelPriceComponent } from '../register-fuel-price/register-fuel-price.component';
import { FuelPriceService } from '../shared/services/fuel-price-service.service';
import { EditFuelPriceComponent } from '../edit-fuel-price/edit-fuel-price.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FuelSupplyContractService } from '@cad-private/fuel-supply-contracts/shared/services/fuel-supply-contract-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'cad-list-fuel-price',
  templateUrl: './list-fuel-price.component.html',
  styleUrls: ['./list-fuel-price.component.scss'],
  providers: [DatePipe],
})
export class ListFuelPriceComponent implements OnInit {
  data: any[] = [];
  columns: any[];
  actions: any[];
  conceptName: any[] = [];

  contract: any[];
  concept: any[];
  statePrice: any[];

  contractsFiltered: any[];
  conceptsFiltered: any[];
  stateFiltered: any[];

  minDate = new Date(new Date().getFullYear() - 1, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);

  private STATE_LAPSED: string = 'Desfasado';
  private STATE_ACTIVE: string = 'Actual';
  //PArameters
  PriceSupplyStateActiveParameter: number;
  PriceSupplyLapsedParameter: number;
  //filter
  fromDate: Date;
  toDate: Date;

  form!: FormGroup;
  constructor(
    public dialog: MatDialog,
    private priceFuelSupplyService: FuelPriceService,
    private _fb: FormBuilder,
    private contractPriceService: FuelSupplyContractService,
    private datePipe: DatePipe
  ) {
    this.columns = [
      { field: 'effectiveDate', header: 'FECHA DE VIGENCIA' },
      { field: 'contract', header: 'CONTRATO' },
      { field: 'concept', header: 'CONCEPTO' },
      { field: 'unitPrice', header: 'VALOR' },
      { field: 'priceState', header: 'ESTADO DE PRECIO' },
      { field: 'documentUrl', header: 'DOCUMENTO' },
    ];
    this.actions = [0, 1, 0];
    this.priceFuelSupplyService.listen().subscribe(res => {
      this.GetSettings();
      this.getAllPrice();
      this.inputDate();
      this.contractPriceService.getContractConcept().subscribe(resp => {
        this.setContract(resp.data.contract);
      });
    });
  }

  ngOnInit(): void {
    this.GetSettings();
    this.getAllPrice();
    this.inputDate();
    this.contractPriceService.getContractConcept().subscribe(resp => {
      this.setContract(resp.data.contract);
    });
  }

  setContract(data) {
    var array: any[] = data;
    var contract: any[] = [];
    array.forEach(element => {
      element.contractDetails.forEach(element2 => {
        this.conceptName.push(element2.name);
      });
      contract.push({ id: element.id, name: element.contractNumber + ' | ' + this.conceptName });
      this.conceptName = [];
    });
    this.contract = contract;
  }

  getAllPrice() {
    this.priceFuelSupplyService.getAll().subscribe(res => {
      this.data = res;
      this.data.map(supply => (supply.effectiveDate = this.datePipe.transform(supply.effectiveDate, 'dd-MM-YYYY')));
      this.data.map(supply => this.setStateSupplyPrice(supply));
    });
  }

  inputDate() {
    const formControls = {
      startDate: new FormControl(new Date(new Date()), []),
      EndDate: new FormControl(new Date(new Date()), []),
    };
    this.form = this._fb.group(formControls);
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterFuelPriceComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getAllPrice();
    });
  }

  editEvent($event: number) {
    const editModal = this.dialog.open(EditFuelPriceComponent, {
      data: {
        Id: $event,
      },
      disableClose: true,
    });
  }

  clearFilters() {
    this.statePrice = null;
    this.concept = null;
    this.contract = null;
    this.GetSettings();
    this.getAllPrice();

    this.contractPriceService.getContractConcept().subscribe(resp => {
      this.setContract(resp.data.contract);
    });
  }

  selectedContracts($event) {
    this.contractsFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedConcepts($event) {
    this.conceptsFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedStates($event) {
    this.stateFiltered = $event.map(function (a) {
      return a.value;
    });
  }

  searchData() {
    let searchData = {
      contracts: this.contractsFiltered,
      concepts: this.conceptsFiltered,
      StatePriceFuelSupply: this.stateFiltered,
      dateStart: this.datePipe.transform(this.fromDate, 'YYYY/MM/dd'),
      dateEnd: this.datePipe.transform(this.toDate, 'YYYY/MM/dd'),
    };
    this.priceFuelSupplyService.getVehicleInspectionsBySearch(searchData).subscribe(res => {
      this.data = res.items;
      this.data.map(supply => this.setStateSupplyPrice(supply));
      this.data.map(supply => (supply.effectiveDate = this.datePipe.transform(supply.effectiveDate, 'dd-MM-YYYY')));
    });
  }
  // validaDate(value): Date {
  //   var responseDate;
  //   if (value != null) {
  //     responseDate = this.datePipe.transform(value, 'YYYY-MM-dd');
  //   }
  //   return responseDate;
  // }

  GetSettings() {
    this.priceFuelSupplyService.getAllSettingsList().subscribe(res => {
      this.concept = res.data.concept;
      this.statePrice = res.data.priceFuelSupplyStates;
      this.PriceSupplyStateActiveParameter = res.data.registrationStateActive;
      this.PriceSupplyLapsedParameter = res.data.registrationStateUnsuscribe;
    });
  }

  setStateSupplyPrice(supply: any) {
    if (supply.state == this.PriceSupplyStateActiveParameter) {
      supply.priceState = this.STATE_ACTIVE;
    } else supply.priceState = this.STATE_LAPSED;
  }

  clearDateEnd() {
    this.toDate = null;
  }

  filterDateEnd = (d: Date): boolean => {
    return this.fromDate < d;
  };
}
