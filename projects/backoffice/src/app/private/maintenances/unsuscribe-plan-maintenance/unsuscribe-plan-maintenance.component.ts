import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { PlanMaintenanceService } from '../shared/services/plan-maintenance.service';
import { ShowPlanMaintenanceComponent } from '../show-plan-maintenance/show-plan-maintenance.component';

@Component({
  selector: 'cad-unsuscribe-plan-maintenance',
  templateUrl: './unsuscribe-plan-maintenance.component.html',
  styleUrls: ['./unsuscribe-plan-maintenance.component.scss']
})
export class UnsuscribePlanMaintenanceComponent implements OnInit {

  planMaintenanceId: number;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private showPlanMaintenanceModal: MatDialogRef<ShowPlanMaintenanceComponent>,
    private planMaintenanceService: PlanMaintenanceService,
    private _msgService: MessagingService
  ) {}

  ngOnInit(): void {
    this.planMaintenanceId = this.data.Id;
  }
  unsuscribePlanMaintenance($event: any) {
    const request={
      UnsuscribePlanMaintenance:{
        id:$event.Id,
        observation:$event.Observation
      } 
    };
    console.log(request);
    this.planMaintenanceService.unsuscribePlanMaintenanceCommand(request).subscribe(
      res => {
        this._msgService.success('PLAN_MAINTENANCES.MESSAGES.UNSUSCRIBE.SUCCESS', 'PLAN_MAINTENANCES.MESSAGES.UNSUSCRIBE.SUCCESS_TITLE');
        this.showPlanMaintenanceModal.close();
        this.planMaintenanceService.filter('unsuscribe');
      },
      error => {
        this._msgService.error('PLAN_MAINTENANCES.MESSAGES.UNSUSCRIBE.FAILED', 'PLAN_MAINTENANCES.MESSAGES.UNSUSCRIBE.FAILED_TITLE');
      }
    );
  }

}
