import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { MobilityRequestService } from '../shared/services/mobilityRequest-service.service';
import { ShowMobilityRequestComponent } from '../show-mobility-request/show-mobility-request.component';

@Component({
  selector: 'cad-unsuscribe-mobility-request',
  templateUrl: './unsuscribe-mobility-request.component.html',
  styleUrls: ['./unsuscribe-mobility-request.component.scss'],
})
export class UnsuscribeMobilityRequestComponent implements OnInit {
  mobilityRequestId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private showMobilityRequestModal: MatDialogRef<ShowMobilityRequestComponent>,
    private mobilityRequestService: MobilityRequestService,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.mobilityRequestId = this.data.Id;
  }

  unsuscribe(event: any) {
    this.mobilityRequestService.unSuscribe(event).subscribe(
      res => {
        this._msgService.success(
          'MOBILITY_REQUEST.MESSAGES.UNSUSCRIBE.SUCCESS',
          'MOBILITY_REQUEST.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE'
        );
        this.showMobilityRequestModal.close();
      },
      error => {
        this._msgService.error(
          'MOBILITY_REQUEST.MESSAGES.UNSUSCRIBE.FAILED',
          'MOBILITY_REQUEST.MESSAGES.UNSUSCRIBE.FAILED_TITLE'
        );
      }
    );
  }
}
