import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FuelSupplyConsumptionService } from '../shared/services/fuel-supply-consumption.service';

@Component({
  selector: 'cad-show-detail-fuel-consumption-control',
  templateUrl: './show-detail-fuel-consumption-control.component.html',
  styleUrls: ['./show-detail-fuel-consumption-control.component.scss'],
})
export class ShowDetailFuelConsumptionControlComponent implements OnInit {
  private PAGE_SIZE_DEFAULT: string = '900';
  private PAGE_NUMBER_DEFAULT: string = '1';
  vehicle: any;
  fuelSupplyConsumption: any;

  //Parameters
  fuelConsumptionStateAcceptable: number;
  fuelConsumptionStateUnacceptable: number;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fuelSupplyConsumptionService: FuelSupplyConsumptionService) {}

  ngOnInit(): void {
    this.getFuelSupplyConsumptionDetails();
  }

  openUnsuscribe() {}

  getFuelSupplyConsumptionDetails() {
    let queryParams = {
      pageSize: this.PAGE_SIZE_DEFAULT,
      pageNumber: this.PAGE_NUMBER_DEFAULT,
      fromDate: this.data.fromDate,
      toDate: this.data.toDate,
      vehicleId: this.data.id,
    };
    this.fuelSupplyConsumptionService.getFuelSupplyConsumptionById(queryParams).subscribe(res => {
      this.vehicle = res;
      this.fuelSupplyConsumption = res.fuelSupplyConsumptionDetails;

      this.getAllFuelSupplyConsumptionSettings();
    });
  }

  getAllFuelSupplyConsumptionSettings() {
    this.fuelSupplyConsumptionService.getAllFuelSupplyConsumptionSettings().subscribe(res => {
      this.fuelConsumptionStateAcceptable = res.data.stateAcceptable;
      this.fuelConsumptionStateUnacceptable = res.data.stateUnacceptable;
    });
  }
}
