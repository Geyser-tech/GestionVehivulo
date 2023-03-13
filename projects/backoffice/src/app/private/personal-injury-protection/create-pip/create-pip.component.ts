import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { TranslateService } from '@ngx-translate/core';
import { DatePipe } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { DocumentService } from '../shared/services/document.service';
import { GetDocumentIdentity } from '../shared/interfaces/get-document-identity';
import { PipService } from '../shared/services/pipservices';

@Component({
  selector: 'cad-create-pip',
  templateUrl: './create-pip.component.html',
  styleUrls: ['./create-pip.component.scss'],
  providers: [DatePipe],
})
export class CreatePipComponent implements OnInit {
  insurances: any[] = [];

  loading: boolean = true;

  pipId: string;

  form!: FormGroup;

  isSubmitting: boolean = false;

  file: any = '';

  vehicle: GetVehicleByLicensePlate;
  documentIdentity: GetDocumentIdentity;

  labels: any[] = [
    { Label: 'brand', Name: this.getTranslation('PIP.DATA.BRAND') },
    { Label: 'model', Name: this.getTranslation('PIP.DATA.MODEL') },
    { Label: 'year', Name: this.getTranslation('PIP.DATA.YEAR') },
    { Label: 'type', Name: this.getTranslation('PIP.DATA.TYPE') },
    { Label: 'area', Name: this.getTranslation('PIP.DATA.AREA') },
    { Label: 'color', Name: this.getTranslation('PIP.DATA.COLOR') },
    { Label: 'serialNumber', Name: this.getTranslation('PIP.DATA.SERIE') },
    { Label: 'engineNumber', Name: this.getTranslation('PIP.DATA.N_ENGINE') },
  ];

  labelsDni: any[] = [{ Label: 'businessName', Name: this.getTranslation('PIP.DATA.BUSINESS_NAME') }];

  constructor(
    private _fb: FormBuilder,
    private pipService: PipService,
    private vehicleService: VehicleService,
    private messageService: MessagingService,
    private _translate: TranslateService,
    private documentService: DocumentService,
    private datePipe: DatePipe,
    private registerpipModal: MatDialogRef<CreatePipComponent>
  ) {}

  ngOnInit(): void {
    const formControls = {
      insurance: new FormControl('', Validators.required),
      policyNumber: new FormControl('', Validators.required),
      startPolicyValidity: new FormControl('', Validators.required),
      endPolicyValidity: new FormControl('', Validators.required),
      startCertificateValidity: new FormControl({ value: '', disabled: true }, Validators.required),
      endCertificateValidity: new FormControl({ value: '', disabled: true }, Validators.required),
      date: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      document: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);

    this.pipService.getPipSettings().subscribe(
      res => {
        this.insurances = res.data.insurer;
      },
      error => {
        this.messageService.error('PIP.CREATE.MESSAGES.INSURER_MASTER.FAILED', 'PIP.CREATE.MESSAGES.INSURER_MASTER.FAILED_TITLE');
      }
    );
  }

  onBlur(controlName: string) {
    this.form.get(controlName)?.markAsDirty();
  }

  save(): void {
    this.loading = false;
    const pip: any = {
      VehicleId: this.vehicle.id,
      InsurerId: this.form.controls.insurance.value,
      BuyerName: this.documentIdentity.businessName,
      BuyerValueDni: this.documentIdentity.documentNumber,
      BuyerValueRuc: this.documentIdentity.ruc,
      PolicyNumber: this.form.controls.policyNumber.value,
      FromValidityPolicy: this.datePipe.transform(this.form.controls.startPolicyValidity.value, 'YYYY/MM/dd'),
      UntilValidityPolicy: this.datePipe.transform(this.form.controls.endPolicyValidity.value, 'YYYY/MM/dd'),
      FromValidityCertificate: this.datePipe.transform(this.form.controls.startCertificateValidity.value, 'YYYY/MM/dd'),
      UntilValidityCertificate: this.datePipe.transform(this.form.controls.endCertificateValidity.value, 'YYYY/MM/dd'),
      IssueDate: this.datePipe.transform(this.form.controls.date.value, 'YYYY/MM/dd'),
      PremiumAmount: this.form.controls.amount.value,
      Document: this.form.value.document,
      Hour: this.form.controls.hour.value,
    };
    if (this.form.valid && this.vehicle.id != undefined && this.documentIdentity != undefined) {
      this.pipService.add(pip).subscribe(
        res => {
          this.loading = true;
          this.messageService.success('PIP.CREATE.MESSAGES.ADD.SUCCESS', 'PIP.CREATE.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerpipModal.close();
          this.pipService.filter('Registered!');
        },
        error => {
          this.loading = true;
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this.messageService.error(error.error.message, 'PIP.CREATE.MESSAGES.INSURER_MASTER.FAILED_TITLE');
          }
        }
      );
    }
  }

  btn_upload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove() {
    this.file = '';
  }

  fileUploaded(event: any) {
    this.file = event.target.files[0];
    this.form.value.document = this.file;
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }

  // Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  seachDocumentIdentity($event) {
    const queryParams = { docuemntNumber: $event.controls.documentIdentity.value };
    this.documentService.getDocument(queryParams).subscribe(
      res => {
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

  receiveDocument(event) {
    this.loading = true;
    this.form.controls['document'].setValue(event.newDocument);
  }

  filterEndPolicy = (d: Date): boolean => {
    return this.form.value.startPolicyValidity < d;
  };

  clearEndPolicy() {
    this.form.controls['endPolicyValidity'].setValue('');
    this.form.controls.endCertificateValidity.setValue('');
    this.form.controls.startCertificateValidity.setValue(this.form.controls.startPolicyValidity.value);
  }

  endPolicy() {
    this.form.controls.endCertificateValidity.setValue(this.form.controls.endPolicyValidity.value);
  }

  filterEndCertificate = (d: Date): boolean => {
    return this.form.value.startCertificateValidity < d;
  };

  clearEndCertificate() {
    this.form.controls['endCertificateValidity'].setValue('');
  }
}
