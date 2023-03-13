import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { MessagingService } from '@cad-core/services';
import { ShowDriversOperatorsComponent } from '../show-drivers-operators/show-drivers-operators.component';
import { DataDriverOperators } from '../shared/services/drivers-operators.service';
import { VehicleAssignmentService } from '@cad-private/vehicles/shared/services/vehicleAssignment-service.service';

@Component({
  selector: 'cad-edit-drivers-operators',
  templateUrl: './edit-drivers-operators.component.html',
  styleUrls: ['./edit-drivers-operators.component.scss'],
  providers: [DatePipe],
})
export class EditDriversOperatorsComponent implements OnInit {
  removeLicenses: any[] = [];
  licenseEdit: any;
  licenseNew: any[] = [];
  licenseUpdate: any[] = [];
  editLicenseValidator: boolean;
  newLicenseValidator: boolean;
  selectedItem: any;
  loading: boolean = true;
  licenses: any[] = [];
  cols: any[];
  files: any[] = [];
  fileRecord: any = '';
  fileLicense: any = '';
  licensesForm: FormGroup;
  form: FormGroup;
  scrollable: boolean;
  driver: any;
  class: any[] = [];
  classOriginal: any[] = [];
  genders: any[] = [];
  areas: any[] = [];
  currentLicences: any[] = [];
  category: any[] = [];
  selectClassValidator: boolean = true;
  documentChanges: boolean = false;
  documents: any;
  licenseDocuments: any;
  documentLicenseChanges: boolean = false;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private _msgService: MessagingService,
    private showDriverModal: MatDialogRef<ShowDriversOperatorsComponent>,
    private driverService: DataDriverOperators,
    private datePipe: DatePipe,
    private vehicleAssignmentService: VehicleAssignmentService
  ) {
    console.log('data', data);
    this.form = this.fb.group({
      dateBirth: new FormControl(new Date(this.revertDate(this.data.driver.birhtDay)), [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required]),
      email: new FormControl(this.data.driver.email, [Validators.required, Validators.email]),
      phone: new FormControl(this.data.driver.phone, [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
      direction: new FormControl(this.data.driver.address, [Validators.required]),
      document: new FormControl(this.data.driver.documentsUrl),
    });
    this.licensesForm = this.fb.group({
      id: new FormControl(''),
      number: new FormControl('', [Validators.required]),
      class: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      issueDate: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      documents: new FormControl('', [Validators.required]),
    });
    this.licenses = this.data.driver.currentLicences.filter(license => license.registrationState == 1);
  }

  ngOnInit(): void {
    if (this.licenses.length == 2) {
      this.editLicenseValidator = false;
      this.newLicenseValidator = false;
    } else {
      this.newLicenseValidator = true;
    }
    this.cols = [
      { field: 'number', header: 'Número - Licencia' },
      { field: 'classCategory', header: 'Clase/Cat.' },
      { field: 'issueDate', header: 'Expedición' },
      { field: 'expirationDate', header: 'Vencimiento' },
    ];
    this.driverService.getAllSettings().subscribe(res => {
      this.genders = res.data.genders;
      this.classOriginal = res.data.class;
      this.class = res.data.class;
      this.areas = res.data.areas;
      if (this.licenses.length < 2) {
        this.class = this.class.filter(item => item.name != this.data.driver.currentLicences[0].class);
      } else {
        this.class = [];
      }
      this.setDefaultValueMasters('gender', this.genders, this.data.driver.gender);
      this.setDefaultValueMasters('area', this.areas, this.data.driver.area);
    });
  }

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.form.get(nameControl).setValue(toSelect.id);
  }

  onFileSelectLicense(event): any {
    this.fileLicense = event.target.files[0];
    this.licensesForm.value.documentLicense = this.fileLicense;
  }
  onFileSelectRecord(event): any {
    this.fileRecord = event.target.files[0];
    this.licensesForm.value.documentRecord = this.fileRecord;
  }

  save() {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const addLicense = this.licenseNew.map(license => {
      const newLicense = {
        number: license.number,
        driverId: this.data.driver.id,
        classId: license.class.id,
        categoryId: license.category.id,
        issueDate: license.issueDate,
        expirationDate: license.expirationDate,
        registrationState: true,
        documentsUrl: '',
        document: license.documents,
      };
      return newLicense;
    });
    const deleteLicences = this.removeLicenses.map(license => {
      const newLicense = {
        id: license.id,
      };
      return newLicense;
    });

    const toEditLicences = this.licenseUpdate.map(license => {
      const newLicense = {
        id: license.id,
        number: license.number,
        driverId: this.data.driver.id,
        classId: license.classId,
        categoryId: license.categoryId,
        issueDate: license.issueDate,
        expirationDate: license.expirationDate,
        registrationState: true,
        documentsUrl: '',
        documents: license.document,
      };
      return newLicense;
    });

    const driver = {
      id: this.data.driver.id,
      genderId: this.form.value.gender,
      areaId: this.form.value.area,
      birhtday: this.datePipe.transform(this.form.value.dateBirth, 'YYYY-MM-dd  HH:MM:SS'),
      email: this.form.value.email,
      phone: this.form.value.phone,
      address: this.form.value.direction,
      documentsUrl: '',
      documents: this.documentChanges == false ? documentRegistered : this.documents,
      toEditLicences: toEditLicences,
      toAddLicences: addLicense,
      toDeleteLicences: deleteLicences,
    };

    this.driverService.update(driver).subscribe(
      res => {
        this.loading = true;
        this._msgService.success('DRIVERS_OPERATORS.MESSAGES.UPDATE.SUCCESS', 'DRIVERS_OPERATORS.MESSAGES.UPDATE.SUCCESS_TITLE');
        this.showDriverModal.close();
        this.driverService.filter('Updated!');
      },
      error => {
        this.loading = true;
        this._msgService.error(error.error.message, 'DRIVERS_OPERATORS.MESSAGES.UPDATE.FAILED_TITLE');
      }
    );
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
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

  saveLicenses(formDirective) {
    const value = this.licensesForm.value;
    value.issueDate = this.datePipe.transform(value.issueDate, 'YYYY-MM-dd');
    value.expirationDate = this.datePipe.transform(value.expirationDate, 'YYYY-MM-dd');
    value.classCategory = value.class.name + '-' + value.category.name;
    this.licenses.push(value);
    this.licenseNew.push(value);
    this.class = this.class.filter(clas => clas.id != value.class.id);
    formDirective.resetForm();
    this.licensesForm.reset();
    this.files = [];
    this.selectClassValidator = false;
    if (this.licenses.length == 2) {
      this.newLicenseValidator = false;
    }
  }

  deleteLicense(id): any {
    if (this.licenses[id].id != '') {
      const addClass = this.classOriginal.filter(item => item.name == this.licenses[id].class);
      this.class.push(addClass[0]);
      this.removeLicenses.push(this.licenses[id]);
    } else {
      this.class.push(this.licenses[id].class);
    }
    this.newLicenseValidator = true;
    this.licenses.splice(id, 1);
  }
  receiveDocumentLicense(event) {
    this.licensesForm.controls['documents'].setValue(event.newDocument);
  }

  editLicense(id): any {
    this.editLicenseValidator = true;
    this.newLicenseValidator = false;
    const license = this.licenses[id];
    this.licenseEdit = license;
    if (license.id != '') {
      const addClass = this.classOriginal.filter(item => item.name == license.class);
      this.class.push(addClass[0]);
      this.licensesForm.controls['id'].setValue(license.id);
    } else {
      this.class.push(license.class);
      license.classId = license.class.id;
      license.class = license.class.name;
      license.categoryId = license.category.id;
      license.category = license.category.name;
    }

    this.licensesForm.controls['number'].setValue(license.number);
    this.licensesForm.controls['issueDate'].setValue(new Date(this.revertDate(license.issueDate)));
    this.licensesForm.controls['expirationDate'].setValue(new Date(this.revertDate(license.expirationDate)));
    this.licensesForm.controls['documents'].setValue(license.documents);
    this.licensesForm.controls['class'].setValue(license.classId);
    this.licensesForm.controls['category'].setValue(license.categoryId);
    this.files = license.documents;
  }

  receiveDocument(event: any) {
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.data.driver.documentsUrl.length) {
        this.form.controls['document'].setValue([]);
      } else {
        this.form.controls['document'].setValue(event);
      }
    } else {
      this.form.controls['document'].setValue(event);
    }
  }

  cancelEditLicense() {
    this.licensesForm.controls['issueDate'].setValue('');
    this.licensesForm.controls['expirationDate'].setValue('');
    this.licensesForm.controls['documents'].setValue('');
    this.licensesForm.controls['number'].setValue('');
    this.licensesForm.controls['class'].setValue('');
    this.licensesForm.controls['category'].setValue('');
    this.files = [];
    this.editLicenseValidator = false;
    if (this.licenses.length < 2) {
      this.newLicenseValidator = true;
    }
    this.class = this.class.filter(item => item.name !== this.licenseEdit.class);
    this.licenseEdit = {};
  }
  saveEditLicense(formDirective) {
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const value = this.licensesForm.value;
    value.issueDate = this.datePipe.transform(value.issueDate, 'YYYY-MM-dd');
    value.expirationDate = this.datePipe.transform(value.expirationDate, 'YYYY-MM-dd');
    value.classCategory = value.class.name + '-' + value.category.name;
    this.licenseEdit.issueDate = this.datePipe.transform(value.issueDate, 'YYYY-MM-dd');
    this.licenseEdit.expirationDate = this.datePipe.transform(value.expirationDate, 'YYYY-MM-dd');
    this.licenseEdit.documents = value.documents;
    this.licenseEdit.document = this.documentLicenseChanges == false ? documentRegistered : this.licenseDocuments;

    let indexLicense = 0;
    this.licenses.map((license, index) => {
      if (this.licenseEdit.number == license.number) {
        indexLicense = index;
      }
    });
    this.licenses[indexLicense] = this.licenseEdit;
    this.licenseUpdate.push(this.licenseEdit);
    this.class = this.class.filter(clas => clas.id != value.class.id);

    formDirective.resetForm();
    this.licensesForm.reset();
    this.files = [];
    this.selectClassValidator = false;
  }

  receiveDocumentLicenseEdit(event) {
    this.documentLicenseChanges = true;
    this.licenseDocuments = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.data.licenseEdit.documents.length) {
        this.licensesForm.controls['documents'].setValue([]);
      } else {
        this.licensesForm.controls['documents'].setValue(event);
      }
    } else {
      this.licensesForm.controls['documents'].setValue(event);
    }
  }
}
