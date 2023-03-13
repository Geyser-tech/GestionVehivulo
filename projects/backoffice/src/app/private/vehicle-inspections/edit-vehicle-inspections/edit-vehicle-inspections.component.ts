import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { TranslateService } from '@ngx-translate/core';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { MessagingService } from '@cad-core/services';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { UpdateVehicleInspection } from '../shared/interfaces/update-vehicle-inspection.interface';
import { ShowVehicleInspectionsComponent } from '../show-vehicle-inspections/show-vehicle-inspections.component';

@Component({
  selector: 'cad-edit-vehicle-inspections',
  templateUrl: './edit-vehicle-inspections.component.html',
  styleUrls: ['./edit-vehicle-inspections.component.scss'],
  providers: [DatePipe],
})
export class EditVehicleInspectionsComponent implements OnInit {
  //envioroment
  year: number;
  month: number;
  day: number;
  form!: FormGroup;
  date: any;
  vehicleInspection: any;
  documentChanges: boolean = false;
  documents: any;
  loading: boolean = true;

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

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  vehicle: GetVehicleByLicensePlate;
  files: any = [];
  provider: any[] = [];
  minDate = new Date(new Date().getFullYear() - 10, 0, 1);
  maxDate = new Date(new Date().getFullYear() + 2, 0, 1);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dateAdapter: DateAdapter<Date>,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService,
    private vehicleService: VehicleService,
    private messageService: MessagingService,
    private _msgService: MessagingService,
    private vehicleInspectionService: VehicleInspectionsService,
    private showVehicleInspectionModal: MatDialogRef<ShowVehicleInspectionsComponent>
  ) {
    // this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getVehicleInspection();
  }

  dataInitial() {
    const formControls = {
      state: new FormControl(this.vehicleInspection.stateVehicleInspection, [Validators.required]),
      licensePlate: new FormControl(this.vehicleInspection.licensePlate, [Validators.required]),
      area: new FormControl(this.vehicleInspection.area, [Validators.required]),
      type: new FormControl(this.vehicleInspection.type, [Validators.required]),
      brand: new FormControl(this.vehicleInspection.brand, [Validators.required]),
      model: new FormControl(this.vehicleInspection.model, [Validators.required]),
      color: new FormControl(this.vehicleInspection.color, [Validators.required]),
      year: new FormControl(this.vehicleInspection.year, [Validators.required]),
      nEngine: new FormControl(this.vehicleInspection.engineNumber, [Validators.required]),
      serie: new FormControl(this.vehicleInspection.serialNumber, [Validators.required]),
      provider: new FormControl('', [Validators.required]),
      certificateNumber: new FormControl(this.vehicleInspection.certificateNumber, [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_]*$'),
        Validators.maxLength(20),
      ]),
      registrationDate: new FormControl(new Date(new Date()), []),
      reviewDate: new FormControl(this.vehicleInspection.reviewDate, [Validators.required]),
      expirationDate: new FormControl(this.vehicleInspection.expirationDate, [Validators.required]),
      document: new FormControl(this.vehicleInspection.documentsUrl, [Validators.required]),
    };
    this.form = this._fb.group(formControls);
    this.getAllProviders();
    console.log(this.datePipe.transform(this.vehicleInspection.reviewDate, 'MM-dd-yyyy'));
  }

  getVehicleInspection() {
    this.vehicleInspectionService.getVehicleInspectionById(this.data.Id).subscribe(res => {
      this.vehicleInspection = {
        ...res.data,
        documentsUrl: res.data.documentsUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        }),
      };
      this.dataInitial();
    });
  }

  getAllProviders() {
    this.vehicleInspectionService.getAllProviderSettings().subscribe(res => {
      this.provider = res.data.provider;
      this.provider.find(resp => {
        if (resp.name == this.vehicleInspection.provider) {
          this.form.controls.provider.setValue(resp.id);
        }
      });
    });
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
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

  reviewDates() {
    const startDate = this.datePipe.transform(this.form.controls.reviewDate.value, 'MM-dd-yyyy HH:MM:SS');
    this.date = new Date(startDate);
    this.year = this.date.getFullYear() + 1;
    this.date.setFullYear(this.year);
    this.form.patchValue({ expirationDate: this.date });
    this.form.controls.registrationDate.setValue(new Date(new Date()));
  }

  expirationDates() {
    if (this.form.controls.expirationDate.value <= this.form.controls.reviewDate.value) {
      this.form.controls.expirationDate.setValue(null);
    }
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.setValueLicensePlate(this.vehicle);
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }

  setValueLicensePlate(value) {
    this.form.controls.licencePlate.setValue(value.id);
    // this.vehicle = value;
  }

  btnSave() {
    this.loading = false;
    const documentRegistered = {
      newDocument: [],
      registeredDocument: [],
    };
    const vehicleInspection: UpdateVehicleInspection = {
      Id: this.vehicleInspection.id,
      CertificateNumber: this.form.value.certificateNumber,
      ProviderId: this.form.value.provider,
      ReviewDate: this.datePipe.transform(this.form.value.reviewDate, 'YYYY-MM-dd HH:MM:SS'),
      ExpirationDate: this.datePipe.transform(this.form.value.expirationDate, 'YYYY-MM-dd HH:MM:SS'),
      DocumentsUrl: '',
      Documents: this.documentChanges == false ? documentRegistered : this.documents,
    };
    console.log(vehicleInspection);

    if (this.form.valid) {
      this.vehicleInspectionService.updateVehicleInspection(vehicleInspection).subscribe(
        res => {
          this.loading = true;
          this._msgService.success(
            'VEHICLE_INSPECTIONS.MESSAGES.UPDATE.SUCCESS',
            'VEHICLE_INSPECTIONS.MESSAGES.UPDATE.SUCCESS_TITLE'
          );
          this.showVehicleInspectionModal.close();
        },
        error => {
          this.loading = true;
          this._msgService.error(error.error.message, 'VEHICLE_INSPECTIONS.MESSAGES.UPDATE.FAILED_TITLE');
        }
      );
    }
  }

  receiveDocument(event: any) {
    this.loading = true;
    this.documentChanges = true;
    this.documents = event;
    if (event.newDocument.length == 0) {
      if (event.registeredDocument.length == this.data.mobilityRequest.documentsUrl.length) {
        this.form.controls['document'].setValue([]);
      } else {
        this.form.controls['document'].setValue(event);
      }
    } else {
      this.form.controls['document'].setValue(event);
    }
  }
}
