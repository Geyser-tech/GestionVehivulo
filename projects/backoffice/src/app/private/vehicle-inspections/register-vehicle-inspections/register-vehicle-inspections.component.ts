import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { DatePipe } from '@angular/common';
import { CreateVehicleInspection } from '../shared/interfaces/create-vehicle-inspection.interface';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'cad-register-vehicle-inspections',
  templateUrl: './register-vehicle-inspections.component.html',
  styleUrls: ['./register-vehicle-inspections.component.scss'],
  providers: [DatePipe],
})
export class RegisterVehicleInspectionsComponent implements OnInit {
  file: any[] = [];
  form!: FormGroup;
  vehicle: GetVehicleByLicensePlate;
  // vehicleInspection: CreateVehicleInspection;
  provider: any[] = [];
  date: any;
  year: number;
  month: number;
  day: number;
  loading: boolean = true;

  constructor(
    private _fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>,
    private vehicleService: VehicleService,
    private _translate: TranslateService,
    private messageService: MessagingService,
    private vehicleInspectionService: VehicleInspectionsService,
    private datePipe: DatePipe,
    private _msgService: MessagingService,
    private registerVehicleInspectionModal: MatDialogRef<RegisterVehicleInspectionsComponent>
  ) {
    this.dateAdapter.setLocale('es-CL');
  }

  ngOnInit(): void {
    this.dataInitial();
  }

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

  //Traductions
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  dataInitial() {
    const formControls = {
      licencePlate: new FormControl('', [Validators.required]),
      provider: new FormControl('', [Validators.required]),
      certificateNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_]*$'),
        Validators.maxLength(20),
      ]),
      registrationDate: new FormControl(new Date(), [Validators.required]),
      reviewDate: new FormControl('', [Validators.required]),
      expirationDate: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
    };

    this.form = this._fb.group(formControls);
    this.vehicleInspectionService.getAllProviderSettings().subscribe(res => {
      this.provider = res.data.provider;
    });
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
  }

  fileUploaded($event): any {
    const fileCapture = $event.target.files[0];
    if (fileCapture) {
      this.file.push(fileCapture);
    }
    this.form.controls.documentsUrl.setValue(fileCapture.name);
  }

  btn_upload() {
    const fileUpload = document.getElementById('fileUpload') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove() {
    this.file = [];
  }

  reviewDates() {
    const startDate = this.datePipe.transform(this.form.controls.reviewDate.value, 'MM-dd-yyyy');
    this.date = new Date(startDate);
    this.year = this.date.getFullYear() + 1;
    this.date.setFullYear(this.year);
    this.form.controls.expirationDate.setValue(this.date);
    //this.form.patchValue({ expirationDate: this.date });
    this.form.controls.registrationDate.setValue(new Date(new Date()));
  }

  expirationDates() {
    if (this.form.controls.expirationDate.value <= this.form.controls.reviewDate.value) {
      this.form.controls.expirationDate.setValue(null);
    }
  }

  save() {
    this.loading = false;
    const vehicleInspection: CreateVehicleInspection = {
      vehicleId: this.form.value.licencePlate,
      providerId: this.form.value.provider,
      certificateNumber: this.form.value.certificateNumber,
      registrationDate: this.datePipe.transform(this.form.value.registrationDate, 'YYYY-MM-dd'),
      reviewDate: this.datePipe.transform(this.form.value.reviewDate, 'YYYY-MM-dd'),
      expirationDate: this.datePipe.transform(this.form.value.expirationDate, 'YYYY-MM-dd'),
      document: this.form.value.document,
    };

    if (this.form.valid) {
      this.vehicleInspectionService.add(vehicleInspection).subscribe(
        res => {
          this.loading = true;
          this._msgService.success('VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS', 'VEHICLE_INSPECTIONS.MESSAGES.ADD.SUCCESS_TITLE');
          this.registerVehicleInspectionModal.close();
        },
        error => {
          this.loading = true;
          if (error.error.errors != null) {
            this.messageService.error('GENERAL.ERRORS.INPUT_DETAIL_ERROR', 'GENERAL.ERRORS.INPUT_TITLE_ERROR');
          } else {
            this._msgService.error(error.error.title, 'VEHICLE_INSPECTIONS.MESSAGES.ADD.FAILED_TITLE');
          }
        }
      );
    }
  }

  receiveDocument(event) {
    this.loading = true;
    this.form.controls['document'].setValue(event.newDocument);
  }

  clearEndDate() {
    this.form.controls['expirationDate'].setValue('');
  }

  filterEndDate = (d: Date): boolean => {
    return this.form.value.reviewDate < d;
  };
}
