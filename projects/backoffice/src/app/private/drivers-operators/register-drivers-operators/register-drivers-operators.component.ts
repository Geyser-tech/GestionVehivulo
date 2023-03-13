import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { GetDocumentIdentity } from '@cad-private/personal-injury-protection/shared/interfaces/get-document-identity';
import { DocumentService } from '@cad-private/personal-injury-protection/shared/services/document.service';
import { MessagingService } from '@cad-core/services';
import { DatePipe } from '@angular/common';
import { DataDriverOperators } from '../shared/services/drivers-operators.service';
import { Drivers } from '../shared/interfaces/drivers.interfaces';
import { VehicleAssignmentService } from '@cad-private/vehicles/shared/services/vehicleAssignment-service.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cad-register-drivers-operators',
  templateUrl: './register-drivers-operators.component.html',
  styleUrls: ['./register-drivers-operators.component.scss'],
  providers: [DatePipe],
})
export class RegisterDriversOperatorsComponent implements OnInit {
  documentIdentity: GetDocumentIdentity;
  loading: boolean = true;
  licensesForm: FormGroup;

  files: any[] = [];
  selectClassValidator: boolean = true;

  licenses: any[] = [];
  cols: any[];
  actualYearValue: number;
  minYearValue: number;
  years: number[] = [];
  form: FormGroup;

  areas: any[] = [];
  genders: any[] = [];

  class: any[] = [];

  category: any[] = [];

  recordFiles: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _translate: TranslateService,
    private messageService: MessagingService,
    private documentService: DocumentService,
    private datePipe: DatePipe,
    private driverService: DataDriverOperators,
    private vehicleAssignmentService: VehicleAssignmentService,
    private _msgService: MessagingService,
    private registerDriverModal: MatDialogRef<RegisterDriversOperatorsComponent>
  ) {
    this.actualYearValue = new Date().getFullYear();
    this.minYearValue = this.actualYearValue - 50;
    this.form = this.fb.group({
      indentificationDocument: new FormControl('', [Validators.required]),
      paternalLastName: new FormControl('', [Validators.required]),
      motherLastName: new FormControl('', [Validators.required]),
      names: new FormControl('', [Validators.required]),
      dateBirth: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(0|[1-9][0-9]*)$'),
        Validators.minLength(9),
        Validators.maxLength(12),
      ]),
      direction: new FormControl('', [Validators.required]),
      document: new FormControl(''),
    });
    this.licensesForm = this.fb.group({
      number: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      issueDate: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      documents: new FormControl('', [Validators.required]),
    });
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  labelsDni: any[] = [
    { Label: 'fatherSurname', Name: this.getTranslation('DRIVERS_OPERATORS.LABELS.PATERNAL_LAST_NAME') },
    { Label: 'motherSurname', Name: this.getTranslation('DRIVERS_OPERATORS.LABELS.MOTHER_LAST_NAME') },
    { Label: 'names', Name: this.getTranslation('DRIVERS_OPERATORS.LABELS.NAMES') },
  ];

  ngOnInit(): void {
    this.setYears();
    this.cols = [
      { field: 'number', header: 'Número - Licencia' },
      { field: 'classCategory', header: 'Clase/Cat.' },
      { field: 'issueDate', header: 'Expedición' },
      { field: 'expirationDate', header: 'Vencimiento' },
    ];

    this.driverService.getAllSettings().subscribe(res => {
      this.genders = res.data.genders;
      this.class = res.data.class;
      this.areas = res.data.areas;
    });
  }

  save() {
    this.loading = false;

    const currentLicences = this.licenses.map(license => {
      const value = {
        number: license.number,
        classId: license.class.id,
        categoryId: license.category.id,
        issueDate: this.revertDate(license.issueDate),
        expirationDate: this.revertDate(license.expirationDate),
        registrationState: true,
        documentsUrl: '',
        document: license.documents,
      };
      return value;
    });
    const driver: Drivers = {
      identityDocument: this.form.value.indentificationDocument,
      firstName: this.form.value.names,
      fatherSurname: this.form.value.paternalLastName,
      motherSurname: this.form.value.motherLastName,
      genderId: this.form.value.gender,
      areaId: this.form.value.area,
      birhtday: this.datePipe.transform(this.form.value.dateBirth, 'YYYY-MM-dd  HH:MM:SS'),
      email: this.form.value.email,
      phone: this.form.value.phone,
      address: this.form.value.direction,
      currentLicences: currentLicences,
      documentsUrl: '',
      registrationState: true,
      document: this.form.value.document,
    };

    this.driverService.add(driver).subscribe(
      res => {
        this.loading = true;
        this._msgService.success('DRIVERS_OPERATORS.MESSAGES.ADD.SUCCESS_TITLE', 'DRIVERS_OPERATORS.MESSAGES.ADD.SUCCESS_TITLE');
        this.registerDriverModal.close();
        this.driverService.filter('Registered!');
      },
      error => {
        this.loading = true;
        this._msgService.error(error.error.message, 'DRIVERS_OPERATORS.MESSAGES.ADD.FAILED_TITLE');
      }
    );
  }

  saveLicenses(formDirective) {
    const value = this.licensesForm.value;
    // value.issueDate = this.datePipe.transform(value.issueDate, 'YYYY-MM-dd');
    // value.expirationDate = this.datePipe.transform(value.expirationDate, 'YYYY-MM-dd');
    value.issueDate = this.datePipe.transform(value.issueDate, 'dd-MM-YYYY');
    value.expirationDate = this.datePipe.transform(value.expirationDate, 'dd-MM-YYYY');
    value.classCategory = value.class.name + '-' + value.category.name;
    this.licenses.push(value);
    this.class = this.class.filter(clas => clas.id != value.class.id);
    formDirective.resetForm();
    this.licensesForm.reset();
    this.files = [];
    this.selectClassValidator = false;
  }

  setYears() {
    for (let i = this.actualYearValue; i >= this.minYearValue; i--) {
      this.years.push(i);
    }
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('-');
    let response = `${year}-${mounth}-${day}`;

    return response;
  }

  deleteLicense(id): any {
    this.class.push(this.licenses[id].class);
    this.licenses.splice(id, 1);
  }

  seachDocumentIdentity(event) {
    const queryParams = { docuemntNumber: event.controls.documentIdentity.value };
    this.documentService.getDocument(queryParams).subscribe(
      res => {
        this.documentIdentity = res.data;
        this.form.controls['indentificationDocument'].setValue(res.data.documentNumber);
        this.form.controls['paternalLastName'].setValue(res.data.fatherSurname);
        this.form.controls['motherLastName'].setValue(res.data.motherSurname);
        this.form.controls['names'].setValue(res.data.names);
      },
      error => {
        event.controls.documentIdentity.setValue('');
        this.documentIdentity = new GetDocumentIdentity();
        this.messageService.error(
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.NOT_FOUND',
          'DOCUMENT_IDENTITY.ACTIONS.SEARCH.ERROR.TITLE'
        );
      }
    );
  }

  receiveDocumentLicense(event) {
    this.licensesForm.controls['documents'].setValue(event.newDocument);
  }

  receiveDocumentRecord(event) {
    this.form.controls['document'].setValue(event.newDocument);
  }
  selectClass(event) {
    this.vehicleAssignmentService.GetSettingsByIdArea(event.id).subscribe(res => {
      this.category = res.data.userAreas.map(item => {
        const newItem = {
          name: item.name,
          id: item.id,
        };
        return newItem;
      });
      this.selectClassValidator = false;
    });
  }

  filterExpirationDate = (d: Date): boolean => {
    return this.licensesForm.value.issueDate < d;
  };

  clearExpirationDate() {
    this.licensesForm.controls['expirationDate'].setValue('');
  }
}
