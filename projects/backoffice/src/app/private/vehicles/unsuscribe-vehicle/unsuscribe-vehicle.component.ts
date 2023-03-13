import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { VehicleService } from '../shared/services/vehicle-service.service';
import { ShowVehicleComponent } from '../show-vehicle/show-vehicle.component';

@Component({
  selector: 'cad-unsuscribe-vehicle',
  templateUrl: './unsuscribe-vehicle.component.html',
  styleUrls: ['./unsuscribe-vehicle.component.scss'],
})
export class UnsuscribeVehicleComponent implements OnInit {
  vehicleId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private showVehicleModal: MatDialogRef<ShowVehicleComponent>,
    private vehicleService: VehicleService,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.vehicleId = this.data.Id;
  }
  unsuscribeVehicle($event: any) {
    this.vehicleService.unSuscribeVehicle($event).subscribe(
      res => {
        this._msgService.success('VEHICLES.MESSAGES.UNSUSCRIBE.SUCCESS', 'VEHICLES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE');
        this.showVehicleModal.close();
        this.vehicleService.filter('unsuscribe');
      },
      error => {
        this._msgService.error('VEHICLES.MESSAGES.UNSUSCRIBE.FAILED', 'VEHICLES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      }
    );
  }
}
