import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ShowFuelSuppliesComponent } from '../show-fuel-supplies/show-fuel-supplies.component';
import { RegisterFuelSuppliesComponent } from '../register-fuel-supplies/register-fuel-supplies.component';
import { FuelSupplyService } from '../shared/services/fuel-supply-service.service';
import { ShowDetailFuelConsumptionControlComponent } from '../show-detail-fuel-consumption-control/show-detail-fuel-consumption-control.component';

@Component({
  selector: 'cad-list-fuel-supplies',
  templateUrl: './list-fuel-supplies.component.html',
  styleUrls: ['./list-fuel-supplies.component.scss'],
  providers: [DatePipe],
})
export class ListFuelSuppliesComponent implements OnInit {
  data: any[] = [];
  columns: any[];
  actions: any[];

  areas: any[];
  contracts: any[];
  fuels: any[];
  licensePlate: any[];

  areasFiltered: any[];
  contractsFiltered: any[];
  fuelsFiltered: any[];
  licensePlatesFiltered: any[];
  form!: FormGroup;

  // filter
  fromDate: Date;
  toDate: Date;

  // Parameter
  constructor(
    public dialog: MatDialog,
    private fuelSupplyService: FuelSupplyService,
    private _fb: FormBuilder,
    private datePipe: DatePipe
  ) {
    this.columns = [
      { field: 'dispachDate', header: 'FECHA' },
      { field: 'dispachNumber', header: 'DESPACHO' },
      { field: 'licensePlate', header: 'PLACA' },
      { field: 'typeVehicle', header: 'TIPO' },
      { field: 'area', header: 'ÁREA' },
      { field: 'fuel', header: 'COMBUSTIBLE' },
      { field: 'contractName', header: 'CONTRATO' },
      { field: 'totalConsumption', header: 'TOTAL/CONSUMO' },
      { field: 'registrationState', header: 'ESTADO' },
    ];
    this.actions = [1, 0, 0];
    this.fuelSupplyService.listen().subscribe(res => {
      this.getAllSettingToFilter();
      this.getAllFuelSupply();
    });
  }

  ngOnInit(): void {
    this.getAllFuelSupply();
    this.getAllSettingToFilter();
    this.inputDate();
  }

  inputDate() {
    const formControls = {
      startDate: new FormControl('', []),
      EndDate: new FormControl('', []),
    };
    this.form = this._fb.group(formControls);
  }

  searchEvent($event: any) {
    const searchModal = this.dialog.open(ShowFuelSuppliesComponent, {
      data: {
        vehicleId: $event.vehicleId,
        dispatchDate: $event.dispachDate,
      },
      disableClose: true,
    });
  }

  selectedAreas($event) {
    this.areasFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedContracts($event) {
    this.contractsFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedFuels($event) {
    this.fuelsFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  selectedLicensePlates($event) {
    this.licensePlatesFiltered = $event.map(function (a) {
      return a.name;
    });
  }

  getAllFuelSupply() {
    this.fuelSupplyService.getAll().subscribe(res => {
      this.data = res;
    });
  }

  getAllSettingToFilter() {
    this.fuelSupplyService.GetAllSettingToFilter().subscribe(resp => {
      this.areas = resp.data.areas;
      this.contracts = resp.data.contracts;
      this.fuels = resp.data.fuels;
      this.licensePlate = resp.data.licensePlate;
    });
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterFuelSuppliesComponent, { disableClose: true });
    dialogRef.backdropClick();
  }

  openShow($event: any): void {
    const dialogRef = this.dialog.open(ShowFuelSuppliesComponent, {
      disableClose: true,
      data: {
        fuelSupplyId: $event,
      },
    });
    dialogRef.backdropClick();
  }

  openDetail(): void {
    const dialogRef = this.dialog.open(ShowDetailFuelConsumptionControlComponent, { disableClose: true });
    dialogRef.backdropClick();
  }

  clearFilters() {
    this.areas = null;
    this.contracts = null;
    this.fuels = null;
    this.licensePlate = null;
    this.getAllSettingToFilter();
    this.getAllFuelSupply();
  }

  filter() {
    const filter = {
      fromDate: this.datePipe.transform(this.fromDate, 'YYYY/MM/dd'),
      toDate: this.datePipe.transform(this.toDate, 'YYYY/MM/dd'),
      areas: this.areasFiltered,
      contracts: this.contractsFiltered,
      fuelTypes: this.fuelsFiltered,
      licensePlates: this.licensePlatesFiltered,
    };
    this.fuelSupplyService.filterFuelSupplies(filter).subscribe(res => {
      this.data = res.items;
    });
  }

  clearDateEnd() {
    this.toDate = null;
  }

  filterDateEnd = (d: Date): boolean => {
    return this.fromDate < d;
  };
}
