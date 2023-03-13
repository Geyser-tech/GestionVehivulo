import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { GetDocumentIdentity } from '@cad-private/personal-injury-protection/shared/interfaces/get-document-identity';
import { DocumentService } from '@cad-private/personal-injury-protection/shared/services/document.service';
import { TranslateService } from '@ngx-translate/core';
import { PlanMaintenanceService } from '../shared/services/plan-maintenance.service';
@Component({
  selector: 'cad-register-plan-maintenance',
  templateUrl: './register-plan-maintenance.component.html',
  styleUrls: ['./register-plan-maintenance.component.scss'],
  providers: [DatePipe],
})
export class RegisterPlanMaintenanceComponent implements OnInit {
  files: any[] = [];
  form!: FormGroup;
  documentIdentity: any;

  loading: boolean = true;
  constructor(
    private _fb: FormBuilder,
    private _translate: TranslateService,
    private planMaintenanceService: PlanMaintenanceService,
    private documentService: DocumentService,
    private messageService: MessagingService,
    private datePipe: DatePipe,
    private registerPlanMaintenanceModal: MatDialogRef<RegisterPlanMaintenanceComponent>
  ) {
    const formControls = {
      address: new FormControl('', [Validators.required]),
      contractNumber: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);
  }

  labelsDni: any[] = [{ Label: 'businessName', Name: this.getTranslation('PIP.DATA.BUSINESS_NAME') }];

  ngOnInit(): void {}

  save() {
    this.loading = false;
    const parameter = {
      CreatePlanMaintenanceParameter: {
        DocumentIdentity: this.documentIdentity.ruc,
        BussinessName: this.documentIdentity.businessName,
        Address: this.form.controls.address.value,
        ContractNumber: this.form.controls.contractNumber.value,
        FromDate: this.datePipe.transform(this.form.controls.fromDate.value, 'YYYY/MM/dd'),
        ToDate: this.datePipe.transform(this.form.controls.toDate.value, 'YYYY/MM/dd'),
        Document: this.form.value.document,
      },
    };
    this.planMaintenanceService.createPlanMaintenance(parameter).subscribe(
      res => {
        this.loading = true;
        this.messageService.success('PLAN_MAINTENANCES.MESSAGES.ADD.SUCCESS', 'PLAN_MAINTENANCES.MESSAGES.ADD.SUCCESS_TITLE');
        this.registerPlanMaintenanceModal.close();
        this.planMaintenanceService.filter('registerPlan');
      },
      error => {
        this.loading = true;
        if (error.error.errors != null) {
          this.messageService.error('PLAN_MAINTENANCES.MESSAGES.ADD.FAILED', 'PLAN_MAINTENANCES.MESSAGES.ADD.FAILED_TITLE');
        } else {
          this.messageService.error(error.error.title, 'PLAN_MAINTENANCES.MESSAGES.ADD.FAILED_TITLE');
        }
      }
    );
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  fileUploaded(event: any) {
    const fileCapture = event.target.files[0];
    if (fileCapture) {
      this.files.push(fileCapture);
      this.form.controls['documents'].setValue(this.files);
    }
  }

  seachDocumentIdentity($event) {
    const queryParams = { docuemntNumber: $event.controls.documentIdentity.value };
    this.documentService.getDocument(queryParams).subscribe(
      res => {
        console.log(res);
        this.documentIdentity = res.data;
      },
      error => {
        $event.controls.documentIdentity.setValue('');
        this.documentIdentity = new GetDocumentIdentity();
        this.messageService.error(
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.NOT_FOUND',
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.TITLE'
        );
      }
    );
  }

  filterToDate = (d: Date): boolean => {
    return this.form.value.fromDate < d;
  };

  clearToDate() {
    this.form.controls['toDate'].setValue('');
  }

  receiveDocument(event) {
    this.form.controls['document'].setValue(event.newDocument);
  }
}
