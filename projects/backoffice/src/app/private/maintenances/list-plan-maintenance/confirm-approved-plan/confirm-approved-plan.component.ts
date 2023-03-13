import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { PlanMaintenanceService } from '@cad-private/maintenances/shared/services/plan-maintenance.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cad-confirm-approved-plan',
  templateUrl: './confirm-approved-plan.component.html',
  styleUrls: ['./confirm-approved-plan.component.scss']
})
export class ConfirmApprovedPlanComponent implements OnInit {

  constructor( 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmApprovedPlanModal: MatDialogRef<ConfirmApprovedPlanComponent>,
    private planMaintenanceService: PlanMaintenanceService, private _translate: TranslateService,  private _msgService: MessagingService) { }

  ngOnInit(): void {
  }
  ApprovePlanMaintenance(){
    const ApprovePlanMaintenanceParameter={
      id:this.data.planMaintenanceId
    }
    console.log(ApprovePlanMaintenanceParameter);
    this.planMaintenanceService.ApprovePlanMaintenance(ApprovePlanMaintenanceParameter).subscribe(res=>{
      this._msgService.success('PLAN_MAINTENANCES.MESSAGES.UPDATE.SUCCESS','PLAN_MAINTENANCES.MESSAGES.UPDATE.SUCCESS_TITLE');
         this.confirmApprovedPlanModal.close();
         this.planMaintenanceService.filter('approvedPlan');
    }, error=>{
      if (error.error.errors != null) {
        this._msgService.error('PLAN_MAINTENANCES.MESSAGES.UPDATE.FAILED', 'PLAN_MAINTENANCES.MESSAGES.UPDATE.FAILED_TITLE');
      } else {
        this._msgService.error(error.error.title, 'PLAN_MAINTENANCES.MESSAGES.UPDATE.FAILED_TITLE');
      }
    })

  }
  closeApprovedPlanMaintenanceModal(){
    this.confirmApprovedPlanModal.close();
    this.planMaintenanceService.filter('approvedPlan');
  }
}
