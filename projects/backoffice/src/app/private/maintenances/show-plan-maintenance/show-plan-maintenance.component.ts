import { Component, Inject, OnInit } from '@angular/core';
import * as FileSaver from 'file-saver';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { EditPlanMaintenanceComponent } from '../list-plan-maintenance/edit-plan-maintenance/edit-plan-maintenance.component';
import { PlanMaintenanceService } from '../shared/services/plan-maintenance.service';
import { UnsuscribePlanMaintenanceComponent } from '../unsuscribe-plan-maintenance/unsuscribe-plan-maintenance.component';

@Component({
  selector: 'cad-show-plan-maintenance',
  templateUrl: './show-plan-maintenance.component.html',
  styleUrls: ['./show-plan-maintenance.component.scss'],
})
export class ShowPlanMaintenanceComponent implements OnInit {
  planMaintenance: any;
  planMaintenanceState: any;

  planMaintenanceSummaryHeader: any;
  planMaintenanceSummaries: any;
  planMaintenanceTotalSummaryContract: any;
  planMaintenanceTotalSummary: any;

  //parameters
  PlanMaintenanceStateRegisteredParameter: any;
  PlanMaintenanceStateApprovedParameter: any;
  PlanMaintenanceStateExpiredParamter: any;

  maintenanceStateRegisteredParameter: any;
  maintenanceStateExecutedParameter: any;
  maintenanceStateNotExecutedParamter: any;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private planMaintenanceService: PlanMaintenanceService,
    private _translate: TranslateService
  ) {}

  private MAINTENANCE_STATE_REGISTERED: string = this.getTranslation('MAINTENANCES.STATES.REGISTERED');
  private MAINTENANCE_STATE_EXECUTED: string = this.getTranslation('MAINTENANCES.STATES.EXECUTED');
  private MAINTENANCE_STATE_NOT_EXECUTED: string = this.getTranslation('MAINTENANCES.STATES.NOT_EXECUTED');

  private STATE_REGISTERED: string = this.getTranslation('PLAN_MAINTENANCES.SHOW.LABELS.STATE_REGISTERED');
  private STATE_APPROVED: string = this.getTranslation('PLAN_MAINTENANCES.SHOW.LABELS.STATE_APPROVED');
  private STATE_EXPIRED: string = this.getTranslation('PLAN_MAINTENANCES.SHOW.LABELS.STATE_EXPIRED');

  ngOnInit(): void {
    this.getPlanMaintenanceById();
  }

  getPlanMaintenanceById() {
    this.planMaintenanceService.getPlanMaintenanceByIdToShow(this.data.Id).subscribe(res => {
      this.planMaintenance = res.data;
      this.planMaintenance.documentsUrl = res.data.documentsUrl.map(documentURL => {
        let separator = documentURL.indexOf(',');
        return (documentURL = {
          file: documentURL.substring(separator + 1, documentURL.length),
          fileName: documentURL.substring(0, separator),
        });
      });
      this.PlanMaintenanceStateApprovedParameter = res.data.planMaintenanceStateApproved;
      this.PlanMaintenanceStateRegisteredParameter = res.data.planMaintenanceStateRegistered;
      this.PlanMaintenanceStateExpiredParamter = res.data.planMaintenanceStateExpired;

      this.maintenanceStateRegisteredParameter = res.data.maintenanceStateRegistered;
      this.maintenanceStateExecutedParameter = res.data.maintenanceStateExecuted;
      this.maintenanceStateNotExecutedParamter = res.data.maintenanceStateNotExecuted;

      this.planMaintenanceTotalSummaryContract = res.data.planMaintenanceTotalContract;
      this.planMaintenanceSummaryHeader = res.data.planMaintenanceSummaryHeaders;
      this.planMaintenanceSummaries = res.data.planMaintenanceSummaries;
      this.planMaintenanceTotalSummary = res.data.planMaintenanceTotalSummary;
      this.setStateCatalogMaintenance();
      this.setStateMaintenance();
    });
  }
  Unsuscribe() {
    const unsuscribePlanMaintenanceModal = this.dialog.open(UnsuscribePlanMaintenanceComponent, {
      disableClose: true,
      width: '40%',
      data: {
        Id: this.planMaintenance.id,
      },
    });
  }
  setStateCatalogMaintenance() {
    if (this.planMaintenance.state == this.PlanMaintenanceStateApprovedParameter) {
      this.planMaintenanceState = this.STATE_APPROVED;
    } else if (this.planMaintenance.state == this.PlanMaintenanceStateRegisteredParameter) {
      this.planMaintenanceState = this.STATE_REGISTERED;
    } else this.planMaintenanceState = this.STATE_EXPIRED;
  }
  setStateMaintenance() {
    this.planMaintenanceSummaries.map(maintenanceType => {
      if (maintenanceType.state == this.maintenanceStateRegisteredParameter) {
        maintenanceType.stateName = this.MAINTENANCE_STATE_REGISTERED;
      } else if (maintenanceType.state == this.maintenanceStateExecutedParameter) {
        maintenanceType.stateName = this.MAINTENANCE_STATE_EXECUTED;
      } else maintenanceType.stateName = this.MAINTENANCE_STATE_NOT_EXECUTED;
    });
  }

  openEdit() {
    const editPlanMaintenanceDialog = this.dialog.open(EditPlanMaintenanceComponent, {
      disableClose: true,
      data: {
        planMaintenanceId: this.planMaintenance.id,
      },
    });
  }

  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  downloadExcelDetailReport() {
    this.planMaintenanceService.getAllMaintenanceByPlanToExcel(this.planMaintenance.id).subscribe(res => {
      console.log(res);
      const blob = new Blob([res.body]);
      FileSaver.saveAs(blob, 'DetallePlanMatenimiento.xlsx');
    });
  }
}
