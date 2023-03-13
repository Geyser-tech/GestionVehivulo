import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { ShowDriversOperatorsComponent } from '../show-drivers-operators/show-drivers-operators.component';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DataDriverOperators } from '../shared/services/drivers-operators.service';

@Component({
  selector: 'cad-unsuscribe-drivers-operators',
  templateUrl: './unsuscribe-drivers-operators.component.html',
  styleUrls: ['./unsuscribe-drivers-operators.component.scss'],
})
export class UnsuscribeDriversOperatorsComponent implements OnInit {
  driverId: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private showDriverModal: MatDialogRef<ShowDriversOperatorsComponent>,
    private driverService: DataDriverOperators,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.driverId = this.data.Id;
  }

  unsuscribe(event: any) {
    this.driverService.unSuscribe(event).subscribe(
      res => {
        this._msgService.success(
          'DRIVERS_OPERATORS.MESSAGES.UNSUSCRIBE.SUCCESS',
          'DRIVERS_OPERATORS.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE'
        );
        this.showDriverModal.close();
        this.driverService.filter('Registered!');
      },
      error => {
        this._msgService.error(
          'DRIVERS_OPERATORS.MESSAGES.UNSUSCRIBE.FAILED',
          'DRIVERS_OPERATORS.MESSAGES.UNSUSCRIBE.FAILED_TITLE'
        );
      }
    );
  }
}
