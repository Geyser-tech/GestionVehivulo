import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { FuelSupplyConsumptionService } from '../shared/services/fuel-supply-consumption.service';
import { ShowDetailFuelConsumptionControlComponent } from '../show-detail-fuel-consumption-control/show-detail-fuel-consumption-control.component';

@Component({
  selector: 'cad-list-detail-fuel-consumption',
  templateUrl: './list-detail-fuel-consumption.component.html',
  styleUrls: ['./list-detail-fuel-consumption.component.scss'],
  providers: [DatePipe],
})
export class ListDetailFuelConsumptionComponent implements OnInit {
  data: any[] = [];
  columns: any[];
  actions: any[];

  //Masters
  fuelTypeMasters: any[];
  licensePlates: any[];
  //Parameters
  stateAcceptableParameter: number;
  stateUnacceptableParameter: number;

  //filters
  fromDate: Date;
  toDate: Date;
  licensePlatesFiltered: number[];
  fuelTypesFiltered: number[];

  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  constructor(
    public dialog: MatDialog,
    private fuelSupplyConsumptionService: FuelSupplyConsumptionService,
    private _translate: TranslateService,
    private datePipe: DatePipe
  ) {
    this.columns = [
      { field: 'licensePlate', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.LICENSE_PLATE') },
      { field: 'fuelType', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.FUEL_TYPE') },
      { field: 'startKm', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.START_KM') },
      { field: 'endKm', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.END_KM') },
      { field: 'totalKm', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.TOTAL_KM') },
      { field: 'gallonsConsumption', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.GALLONS_CONSUMPTION') },
      { field: 'fixedRange', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.FIXED_RANGE') },
      { field: 'perceivedRange', header: this.getTranslation('FUEL_CONSUMPTION.LIST.LABELS.PERCEIVED') },
    ];
    this.actions = [1, 0, 0];
  }

  searchEvent($event) {
    const searchModal = this.dialog.open(ShowDetailFuelConsumptionControlComponent, {
      disableClose: true,
      data: {
        id: $event.id,
        fromDate: $event.fromDate,
        toDate: $event.toDate,
      },
    });
    searchModal.backdropClick();
  }

  ngOnInit(): void {
    this.getAllFuelSupplyConsumption();
    this.getAllFuelSupplyConsumptionSettings();
  }

  getAllFuelSupplyConsumption() {
    this.fuelSupplyConsumptionService.getAllFuelSupplyConsumption().subscribe(res => {
      this.data = res.items;
    });
  }

  getAllFuelSupplyConsumptionSettings() {
    this.fuelSupplyConsumptionService.getAllFuelSupplyConsumptionSettings().subscribe(res => {
      this.fromDate = res.data.fromDate;
      this.toDate = res.data.toDate;
      this.fuelTypeMasters = res.data.fuelTypes;
      this.licensePlates = res.data.licensePlates;
    });
  }

  selectedFuelType($event) {
    this.fuelTypesFiltered = $event.map(function (a) {
      return a.id;
    });
  }
  selectedLicensePlates($event) {
    this.licensePlatesFiltered = $event.map(function (a) {
      return a.id;
    });
  }

  filter() {
    let searchData;
    if (this.fromDate == null) {
      searchData = {
        fuelTypes: this.fuelTypesFiltered,
        licensePlates: this.licensePlatesFiltered,
        pageNumber: '1',
        pageSize: '30',
      };
    }
    if (this.fromDate != null) {
      searchData = {
        fuelTypes: this.fuelTypesFiltered,
        licensePlates: this.licensePlatesFiltered,
        fromDate: this.datePipe.transform(this.fromDate, 'YYYY/MM/dd'),
        toDate: this.datePipe.transform(this.toDate, 'YYYY/MM/dd'),
        pageNumber: '1',
        pageSize: '30',
      };
    }
    this.fuelSupplyConsumptionService.getFuelSupplyConsumptionBySearch(searchData).subscribe(response => {
      this.data = response.items;
    });
  }
  clearFilters() {
    this.fuelTypeMasters = null;
    this.licensePlates = null;
    this.getAllFuelSupplyConsumption();
    this.getAllFuelSupplyConsumptionSettings();
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  clearDateEnd() {
    this.toDate = null;
  }

  filterDateEnd = (d: Date): boolean => {
    return this.fromDate < d;
  };
}
