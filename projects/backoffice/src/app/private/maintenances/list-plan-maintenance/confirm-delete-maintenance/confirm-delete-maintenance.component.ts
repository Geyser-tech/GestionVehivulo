import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { PlanMaintenanceService } from '@cad-private/maintenances/shared/services/plan-maintenance.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmApprovedPlanComponent } from '../confirm-approved-plan/confirm-approved-plan.component';

@Component({
  selector: 'cad-confirm-delete-maintenance',
  templateUrl: './confirm-delete-maintenance.component.html',
  styleUrls: ['./confirm-delete-maintenance.component.scss']
})
export class ConfirmDeleteMaintenanceComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  private confirmDeleteMaintenanceDialog: MatDialogRef<ConfirmApprovedPlanComponent>,
  private planMaintenanceService: PlanMaintenanceService, private _translate: TranslateService,  private _msgService: MessagingService) { }

  ngOnInit(): void {
  }
  deleteMaintenance(){
    const Maintenance={
      id:this.data.maintenanceId
    }
    this.planMaintenanceService.unsuscribeMaintenanceFromPlanMaintenance(Maintenance).subscribe(res=>{
      this._msgService.success('MAINTENANCES.MESSAGES.UNSUSCRIBE.SUCCESS','MAINTENANCES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE');
         this.confirmDeleteMaintenanceDialog.close();
         this.planMaintenanceService.filter('deleteMaintenance');
    }, error=>{
      if (error.error.errors != null) {
        this._msgService.error('MAINTENANCES.MESSAGES.UNSUSCRIBE.FAILED', 'MAINTENANCES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      } else {
        this._msgService.error(error.error.title, 'MAINTENANCES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      }
    })
  }

  closeDeletePlanMaintenanceModal(){
    this.confirmDeleteMaintenanceDialog.close();
  }
}
