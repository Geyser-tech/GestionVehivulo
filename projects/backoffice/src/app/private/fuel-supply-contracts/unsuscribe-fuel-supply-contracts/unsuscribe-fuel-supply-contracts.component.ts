import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { FuelSupplyContractService } from '../shared/services/fuel-supply-contract-service.service';
import { ShowFuelSupplyContractsComponent } from '../show-fuel-supply-contracts/show-fuel-supply-contracts.component';

@Component({
  selector: 'cad-unsuscribe-fuel-supply-contracts',
  templateUrl: './unsuscribe-fuel-supply-contracts.component.html',
  styleUrls: ['./unsuscribe-fuel-supply-contracts.component.scss'],
})
export class UnsuscribeFuelSupplyContractsComponent implements OnInit {
  contracId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fuelSupplyContractService: FuelSupplyContractService,
    private _msgService: MessagingService,
    private showContractModal: MatDialogRef<ShowFuelSupplyContractsComponent>
  ) {}

  ngOnInit(): void {
    this.contracId = this.data.Id;
  }

  unsuscribe($event: any) {
    this.fuelSupplyContractService.unSuscribeContract($event).subscribe(
      res => {
        this._msgService.success('VEHICLES.MESSAGES.UNSUSCRIBE.SUCCESS', 'VEHICLES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE');
        this.showContractModal.close();
      },
      error => {
        this._msgService.error('VEHICLES.MESSAGES.UNSUSCRIBE.FAILED', 'VEHICLES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      }
    );
  }
}
