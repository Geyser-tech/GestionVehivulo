import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { PlanMaintenanceService } from '@cad-private/maintenances/shared/services/plan-maintenance.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cad-edit-plan-maintenance',
  templateUrl: './edit-plan-maintenance.component.html',
  styleUrls: ['./edit-plan-maintenance.component.scss'],
})
export class EditPlanMaintenanceComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private editPlanModal: MatDialogRef<EditPlanMaintenanceComponent>,
    private planMaintenanceService: PlanMaintenanceService,
    private _translate: TranslateService,
    private _msgService: MessagingService
  ) {}
  loading: boolean = true;
  planMaintenance: any;
  PlanMaintenanceStateRegisteredParameter: any;
  PlanMaintenanceStateApprovedParameter: any;
  PlanMaintenanceStateExpiredParamter: any;

  editPlanMaintenanceForm: FormGroup;

  documentChanges: boolean = false;
  documents: any;
  ngOnInit(): void {
    this.getPlanMaintenanceById();
  }

  createForm() {
    this.editPlanMaintenanceForm = this.fb.group({
      address: new FormControl(this.planMaintenance.providerAddress, [Validators.required]),
      contractNumber: new FormControl(this.planMaintenance.contractNumber, [Validators.required]),
      fromDate: new FormControl(new Date(this.planMaintenance.fromDate), [Validators.required]),
      toDate: new FormControl(new Date(this.planMaintenance.toDate), [Validators.required]),
      document: new FormControl(this.planMaintenance.documentsUrl, [Validators.required]),
    });
  }

  getPlanMaintenanceById() {
    this.planMaintenanceService.getPlanMaintenanceByIdToShow(this.data.planMaintenanceId).subscribe(res => {
      this.planMaintenance = res.data;
      this.planMaintenance.documentsUrl = res.data.documentsUrl.map(documentURL => {
        let separator = documentURL.indexOf(',');
        return (documentURL = {
          file: documentURL.substring(separator + 1, documentURL.length),
          fileName: documentURL.substring(0, separator),
        });
      });
      console.log(this.planMaintenance);
      this.PlanMaintenanceStateApprovedParameter = res.data.planMaintenanceStateApproved;
      this.PlanMaintenanceStateRegisteredParameter = res.data.planMaintenanceStateRegistered;
      this.PlanMaintenanceStateExpiredParamter = res.data.planMaintenanceStateExpired;
      this.createForm();
    });
  }
  saveEditPlanMaintenance() {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const request = {
      updatePlanMaintenance: {
        Id: this.planMaintenance.id,
        FromDate: this.editPlanMaintenanceForm.controls.fromDate.value,
        ToDate: this.editPlanMaintenanceForm.controls.toDate.value,
        ProviderAddress: this.editPlanMaintenanceForm.controls.address.value,
        ContractNumber: this.editPlanMaintenanceForm.controls.contractNumber.value,
        DocumentsUrl: '',
        Documents: this.documentChanges == false ? documentRegistered : this.documents,
      },
    };
    this.planMaintenanceService.updatePlanMaintenance(request).subscribe(
      res => {
        this.loading = true;
        this.editPlanModal.close();
        this._msgService.success('PLAN_MAINTENANCES.MESSAGES.UPDATE.SUCCESS', 'PLAN_MAINTENANCES.MESSAGES.UPDATE.SUCCESS_TITLE');
        this.planMaintenanceService.filter('');
      },
      error => {
        this.loading = true;
        this._msgService.error('PLAN_MAINTENANCES.MESSAGES.UPDATE.FAILED', 'PLAN_MAINTENANCES.MESSAGES.UPDATE.FAILED_TITLE');
      }
    );
  }

  filterToDate = (d: Date): boolean => {
    return this.editPlanMaintenanceForm.value.fromDate < d;
  };

  clearToDate() {
    this.editPlanMaintenanceForm.controls['toDate'].setValue('');
  }

  receiveDocument(event: any) {
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.planMaintenance?.documentsUrl.length) {
        this.editPlanMaintenanceForm.controls['document'].setValue([]);
      } else {
        this.editPlanMaintenanceForm.controls['document'].setValue(event);
      }
    } else {
      this.editPlanMaintenanceForm.controls['document'].setValue(event);
    }
  }
}
