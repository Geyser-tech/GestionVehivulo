import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PipService } from '../shared/services/pipservices';
import { MessagingService } from '@cad-core/services';
// import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'cad-edit-pip',
  templateUrl: './edit-pip.component.html',
  styleUrls: ['./edit-pip.component.scss'],
  providers: [DatePipe],
})
export class EditPipComponent implements OnInit {
  //envioroment
  year: number;
  month: number;
  day: number;
  date: any;
  PIPForm: FormGroup;
  files: any = [];
  pip: any;
  insurancesMaster: any;
  documentChanges: boolean = false;
  documents: any;
  loading: boolean = true;

  pipState: string;
  private STATE_EXPIRE: string = this.getTranslation('PIP.SHOW_PIP.STATES.EXPIRE');
  private STATE_LAPSED: string = this.getTranslation('PIP.SHOW_PIP.STATES.LAPSED');
  private STATE_ACTIVE: string = this.getTranslation('PIP.SHOW_PIP.STATES.ACTIVE');

  //initialize envioroment
  minDate = new Date(new Date().getFullYear() - 10, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);
  //Parameters
  pipStateExpireParameter: number;
  pipStateLapsedParameter: number;
  pipStateActiveParameter: number;

  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pipService: PipService,
    private dateAdapter: DateAdapter<Date>,
    private messageService: MessagingService,
    private _translate: TranslateService,
    private _msgService: MessagingService,
    private editPipDialog: MatDialogRef<EditPipComponent>
  ) {}

  ngOnInit(): void {
    this.getPip();
  }

  private createForm(): void {
    this.PIPForm = this._fb.group({
      insurance: new FormControl('', Validators.required),
      policyNumber: new FormControl(this.pip.policyNumber, Validators.required),
      startPolicyValidity: new FormControl(new Date(this.pip.fromValidityPolicy), Validators.required),
      endPolicyValidity: new FormControl(new Date(this.pip.untilValidityPolicy), Validators.required),
      startCertificateValidity: new FormControl(new Date(this.pip.fromValidityCertificate), Validators.required),
      endCertificateValidity: new FormControl(new Date(this.pip.untilValidityCertificate), Validators.required),
      date: new FormControl(new Date(this.pip.issueDate), Validators.required),
      hour: new FormControl(this.datePipe.transform(this.pip.issueDate, 'hh:mm'), Validators.required),
      amount: new FormControl(this.pip.premiumAmount, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      document: new FormControl(this.pip.documentsUrl, [Validators.required]),
    });
  }

  setValue() {
    this.PIPForm.controls.endPolicyValidity.setValue(this.pip.fromValidityPolicy);
  }

  ConvertDateStringToDate(date: any) {
    const [day, month, year] = date.split('/');
    return new Date(+day, +month, +year);
  }

  StartDatePoliza() {
    const startDate = this.datePipe.transform(this.PIPForm.value.startDatePoliza, 'MM-dd-yyyy');
    this.date = new Date(startDate);
    this.year = this.date.getFullYear() + 1;
    this.date.setFullYear(this.year);
    this.PIPForm.patchValue({ endDatePoliza: this.date });
  }

  EndDatePoliza() {
    if (this.PIPForm.value.endDatePoliza <= this.PIPForm.value.startDatePoliza) {
      this.PIPForm.controls.endDatePoliza.setValue(null);
    }
  }

  StartDateSOAT() {
    const startDate = this.datePipe.transform(this.PIPForm.value.startDateSOAT, 'MM-dd-yyyy');
    this.date = new Date(startDate);
    this.year = this.date.getFullYear() + 1;
    this.date.setFullYear(this.year);
    this.PIPForm.patchValue({ endDateSOAT: this.date });
  }

  EndDateSOAT() {
    if (this.PIPForm.value.endDateSOAT <= this.PIPForm.value.startDateSOAT) {
      this.PIPForm.controls.endDateSOAT.setValue(null);
    }
  }

  // Custom Validator
  ValidationEndDate(control: FormControl) {
    if (control.value == null) {
      return { ValidationEndDate: true };
    }
    return null;
  }

  dateChanged() {
    this.date = this.PIPForm.value.startDatePoliza;
    this.year = this.PIPForm.value.startDatePoliza.getFullYear() + 1;
    this.date.setFullYear(this.year);
    const data = new Date('Wed Nov 13 2013 00:00:00 GMT-0500 (Peru Standard Time)');
    const data1 = new Date('11-10-2022');
    this.PIPForm.patchValue({ endDatePoliza: this.date });
  }

  editPIP() {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const pip: any = {
      Id: this.pip.id,
      InsurerId: this.PIPForm.controls.insurance.value,
      PolicyNumber: this.PIPForm.controls.policyNumber.value,
      FromValidityPolicy: this.datePipe.transform(this.PIPForm.controls.startPolicyValidity.value, 'YYYY/MM/dd'),
      UntilValidityPolicy: this.datePipe.transform(this.PIPForm.controls.endPolicyValidity.value, 'YYYY/MM/dd'),
      FromValidityCertificate: this.datePipe.transform(this.PIPForm.controls.startCertificateValidity.value, 'YYYY/MM/dd'),
      UntilValidityCertificate: this.datePipe.transform(this.PIPForm.controls.endCertificateValidity.value, 'YYYY/MM/dd'),
      IssueDate: this.datePipe.transform(this.PIPForm.controls.date.value, 'YYYY/MM/dd'),
      PremiumAmount: this.PIPForm.controls.amount.value,
      DocumentsUrl: '',
      Documents: this.documentChanges == false ? documentRegistered : this.documents,
      Hour: this.PIPForm.controls.hour.value,
    };

    if (this.PIPForm.valid && (this.pip.id != null || this.pip.id == '')) {
      this.pipService.updatePip(pip).subscribe(
        res => {
          this.loading = true;
          this._msgService.success('PIP.MESSAGES.UPDATE.SUCCESS', 'VEHICLES.MESSAGES.UPDATE.SUCCESS_TITLE');
          this.editPipDialog.close();
          this.pipService.filter('Edit!');
        },
        error => {
          this.loading = true;
          this._msgService.error('PIP.MESSAGES.UPDATE.FAILED', 'VEHICLES.MESSAGES.UPDATE.FAILED_TITLE');
        }
      );
    }
  }
  btn_upload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }
  fileUploaded(event: any) {
    const fileCapture = event.target.files[0];
    if (fileCapture) {
      this.files.push(fileCapture);
    }
  }

  getPip() {
    this.pipService.getPipById(this.data.Id).subscribe(res => {
      this.pip = {
        ...res.data,
        documentsUrl: res.data.documentsUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        }),
      };
      this.pipStateExpireParameter = res.data.pipStateExpire;
      this.pipStateLapsedParameter = res.data.pipStateLapsed;
      this.pipStateActiveParameter = res.data.pipStateActive;
      this.setStatePip();
      this.createForm();
      this.getSettings();
      console.log('form', this.PIPForm);
    });
  }
  getSettings() {
    this.pipService.getPipSettings().subscribe(
      res => {
        this.insurancesMaster = res.data.insurer;
        this.setDefaultValueMasters('insurance', this.insurancesMaster, this.pip.insurer);
      },
      error => {
        this.messageService.error('PIP.CREATE.MESSAGES.INSURER_MASTER.FAILED', 'PIP.CREATE.MESSAGES.INSURER_MASTER.FAILED_TITLE');
      }
    );
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.PIPForm.get(nameControl).setValue(toSelect.id);
  }
  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
  setStatePip() {
    if (this.pip.state == this.pipStateExpireParameter) {
      this.pipState = this.STATE_EXPIRE;
    } else if (this.pip.state == this.pipStateLapsedParameter) {
      this.pipState = this.STATE_LAPSED;
    } else this.pipState = this.STATE_ACTIVE;
  }

  receiveDocument(event: any) {
    this.loading = true;
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.data.mobilityRequest.documentsUrl.length) {
        this.PIPForm.controls['document'].setValue([]);
      } else {
        this.PIPForm.controls['document'].setValue(event);
      }
    } else {
      this.PIPForm.controls['document'].setValue(event);
    }
  }

  filterEndPolicy = (d: Date): boolean => {
    return this.PIPForm.value.startPolicyValidity < d;
  };

  clearEndPolicy() {
    this.PIPForm.controls['endPolicyValidity'].setValue('');
  }

  filterEndCertificate = (d: Date): boolean => {
    return this.PIPForm.value.startCertificateValidity < d;
  };

  clearEndCertificate() {
    this.PIPForm.controls['endCertificateValidity'].setValue('');
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
  }
}
