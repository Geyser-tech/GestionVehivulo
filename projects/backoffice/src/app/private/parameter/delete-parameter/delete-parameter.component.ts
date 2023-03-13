/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { CaveatParameterComponent } from '../caveat-parameter/caveat-parameter.component';
import { ConfigurationService } from '../shared/services/configuration.service';

@Component({
  selector: 'cad-delete-parameter',
  templateUrl: './delete-parameter.component.html',
  styleUrls: ['./delete-parameter.component.scss'],
})
export class DeleteParameterComponent implements OnInit {
  configurationId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private configurationService: ConfigurationService,
    private _msgService: MessagingService,
    private unsuscribeConfigurationModal: MatDialogRef<DeleteParameterComponent>
  ) {}

  ngOnInit(): void {
    this.configurationId = this.data.Id;
  }
  // advertecenseParameter(): void {
  //   const dialogRef = this.dialog.open(CaveatParameterComponent, { disableClose: true });
  //   dialogRef.backdropClick();
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });
  // }
  unsuscribe($event: any) {
    this.configurationService.unSuscribeConfiguration($event).subscribe(
      res => {
        this._msgService.success(
          'PARAMETER.CONFIGURATION.MESSAGES.UNSUSCRIBE.SUCCESS',
          'PARAMETER.CONFIGURATION.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE'
        );
        this.unsuscribeConfigurationModal.close();
      },
      error => {
        this._msgService.error(
          'PARAMETER.CONFIGURATION.MESSAGES.UNSUSCRIBE.FAILED',
          'PARAMETER.CONFIGURATION.MESSAGES.UNSUSCRIBE.FAILED_TITLE'
        );
      }
    );
  }
}
