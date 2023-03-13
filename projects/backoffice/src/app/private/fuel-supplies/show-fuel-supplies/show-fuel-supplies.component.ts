import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { EditFuelSuppliesComponent } from '../edit-fuel-supplies/edit-fuel-supplies.component';
import { getFuelSupplyById } from '../shared/interfaces/get-fuelsupply-byId.interface';
import { FuelSupplyService } from '../shared/services/fuel-supply-service.service';
import { UnsuscribeFuelSuppliesComponent } from '../unsuscribe-fuel-supplies/unsuscribe-fuel-supplies.component';

@Component({
  selector: 'cad-show-fuel-supplies',
  templateUrl: './show-fuel-supplies.component.html',
  styleUrls: ['./show-fuel-supplies.component.scss'],
})
export class ShowFuelSuppliesComponent implements OnInit {
  scrollable: boolean;

  vehicle: any;
  fuelSupply: any;
  fuelSupplyDetails: any;
  total: number;
  constructor(
    public dialog: MatDialog,
    private fuelSupplyService: FuelSupplyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getFuelSupplyById();
  }

  getFuelSupplyById() {
    this.fuelSupplyService.getFuelSupplyById(this.data.fuelSupplyId).subscribe(response => {
      this.vehicle = response.data.vehicle;
      this.fuelSupply = response.data.fuelSupply;
      this.fuelSupplyDetails = response.data.fuelSupplyDetails;
      this.total = response.data.total;
    });
  }

  openEdit(): void {
    const dialogRef = this.dialog.open(EditFuelSuppliesComponent, {
      disableClose: true,
      data: {
        fuelSupplyId: this.data.fuelSupplyId,
      },
    });
    dialogRef.backdropClick();
  }

  openUnsuscribe(): void {
    const dialogRef = this.dialog.open(UnsuscribeFuelSuppliesComponent, {
      disableClose: true,
      data: {
        id: this.data.fuelSupplyId,
      },
    });
    dialogRef.backdropClick();
  }
}
