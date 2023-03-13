import { Component, OnInit, Input, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { MessagingService } from '@cad-core/services';
import { ShowVehicleInspectionsComponent } from '../show-vehicle-inspections/show-vehicle-inspections.component';

@Component({
  selector: 'cad-unsuscribe-vehicle-inspections',
  templateUrl: './unsuscribe-vehicle-inspections.component.html',
  styleUrls: ['./unsuscribe-vehicle-inspections.component.scss'],
})
export class UnsuscribeVehicleInspectionsComponent implements OnInit {
  VehicleInspectionId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vehicleInspectionService: VehicleInspectionsService,
    private _msgService: MessagingService,
    private showVehicleInspectionModal: MatDialogRef<ShowVehicleInspectionsComponent>
  ) {}

  ngOnInit(): void {
    this.VehicleInspectionId = this.data.Id;
  }
  unsuscribe($event: any) {
    this.vehicleInspectionService.unSuscribeVehicleInspection($event).subscribe(
      res => {
        this._msgService.success('VEHICLE_INSPECTIONS.MESSAGES.UNSUSCRIBE.SUCCESS', 'VEHICLES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE');
        this.showVehicleInspectionModal.close();
      },
      error => {
        this._msgService.error('VEHICLE_INSPECTIONS.MESSAGES.UNSUSCRIBE.FAILED', 'VEHICLES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      }
    );
  }
}
