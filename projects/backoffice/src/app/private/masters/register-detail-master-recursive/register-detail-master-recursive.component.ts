import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { FuelSupplyService } from '@cad-private/fuel-supplies/shared/services/fuel-supply-service.service';
import { MasterDetail } from '../shared/interfaces/MasterDetail.model';
import { MasterDetailService } from '../shared/services/master-detail.service';

@Component({
  selector: 'cad-register-detail-master-recursive',
  templateUrl: './register-detail-master-recursive.component.html',
  styleUrls: ['./register-detail-master-recursive.component.scss'],
})
export class RegisterDetailMasterRecursiveComponent implements OnInit {
  idMaster: number;
  userAreaId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private masterDetailService: MasterDetailService,
    private registerBrandModal: MatDialogRef<RegisterDetailMasterRecursiveComponent>,
    private _msgService: MessagingService,
    private fuelSupplyService:FuelSupplyService
  ) {}

  ngOnInit(): void {
    this.idMaster = this.data.MasterId;
    this.userAreaId = this.data.UserAreaId;
  }
  registerDetailMaster($event: MasterDetail) {
    const masterDetail: MasterDetail = {
      GenericId: $event.GenericId,
      UserAreaId: $event.UserAreaId,
      Code: $event.Code,
      Name: $event.Name,
    };
    this.masterDetailService.saveDetailMasterRecursive(masterDetail).subscribe(
      res => {
        this._msgService.success('DETAIL_MASTERS.MESSAGES.ADD.SUCCESS', 'VEHICLES.MESSAGES.ADD.SUCCESS_TITLE');
        this.registerBrandModal.close();
        this.fuelSupplyService.filter("");
      },
      error => {
        this._msgService.error('DETAIL_MASTERS.MESSAGES.ADD.FAILED', 'VEHICLES.MESSAGES.ADD.FAILED_TITLE');
      }
    );
  }
}
