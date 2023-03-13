import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MessagingService } from '@cad-core/services';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { MaintenancesService } from '../shared/services/maintenances-service.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'cad-register-maintenances',
  templateUrl: './register-maintenances.component.html',
  styleUrls: ['./register-maintenances.component.scss'],
  providers: [DatePipe],
})
export class RegisterMaintenancesComponent implements OnInit {
  form!: FormGroup;
  formCorrective!: FormGroup;
  formPreventive!: FormGroup;
  file: any;
  fileVehicle: any;
  fileConformity: any;
  fileSparePart: any;

  columns: any = [];
  typeMaintenance: any[] = [];
  classMaintencances: any[] = [];
  activities: any[] = [];
  activitiesTemporal: any[] = [];
  spareParts: any[] = [];
  sparePartsTemporal: any[] = [];
  listPlanMaintenance: any[] = [];
  preventiveMaintenance: number = 0;
  correctiveMaintenance: number = 0;
  valueTypeMaintenance: number = 0;
  selectPlanMaintenance: any;

  typeForm: string = 'preventive';

  loading: boolean = true;

  vehicle: GetVehicleByLicensePlate;

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

  constructor(
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService,
    private vehicleService: VehicleService,
    private messageService: MessagingService,
    private _maintenanceService: MaintenancesService,
    private registerMaintenanceModal: MatDialogRef<RegisterMaintenancesComponent>
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {
    this.reactiveForm();
  }

  dataInitial() {
    this._maintenanceService.getAllSettingsToList().subscribe(response => {
      this.preventiveMaintenance = response.data.preventiveMaintenance;
      this.reactiveForm();
      this.typeMaintenance = response.data.typeMaintenance;
      this.classMaintencances = response.data.maintenanceClass;
      this.correctiveMaintenance = response.data.correctiveMaintenance;
    });
  }

  reactiveForm() {
    const formCorrectiveControls = {
      vehicleId: new FormControl('', [Validators.required]),
      typeMaintenanceId: new FormControl(this.correctiveMaintenance, [Validators.required]),
    };
    const formPreventivoControls = {
      vehicleId: new FormControl('', [Validators.required]),
      typeMaintenanceId: new FormControl(this.correctiveMaintenance, [Validators.required]),
      typeEngine: new FormControl('', [Validators.required]),
      typeEngineId: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required]),
      planId: new FormControl('', [Validators.required]),
    };
    const formControls = {
      vehicleId: new FormControl('', [Validators.required]),

      typeMaintenanceId: new FormControl(this.preventiveMaintenance, [Validators.required]),
      maintenanceClassId: new FormControl('', [Validators.required]),
      typeEngine: new FormControl(''),
      typeEngineId: new FormControl(''),
      km: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      date: new FormControl('', [Validators.required]),
      totalAmount: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      planId: new FormControl('', [Validators.required]),
      activities: new FormControl('', [Validators.required]),

      selectSpareParts: new FormControl(''),
      selectActivities: new FormControl(''),

      arrayListMaintenanceDetail: this._fb.array([]),
      arrayListActivities: this._fb.array([]),
      arrayActivitiescheckBox: this._fb.array([]),

      documentSparePart: new FormControl('', [Validators.required]),
      documentConformity: new FormControl('', [Validators.required]),
      documentVehicle: new FormControl('', [Validators.required]),
    };
    this.form = this._fb.group(formControls);
    this.formCorrective = this._fb.group(formCorrectiveControls);
    this.formPreventive = this._fb.group(formPreventivoControls);

    this.form.controls.typeEngine.disable();
    this.form.controls.km.disable();
    this.form.controls.totalAmount.disable();
    this.form.controls.activities.disable();
    this.form.controls.documentSparePart.disable();
    this.form.controls.documentConformity.disable();
    this.form.controls.documentVehicle.disable();
  }

  get arrayListMaintenanceDetail() {
    return this.form.get('arrayListMaintenanceDetail') as FormArray;
  }

  get arrayListActivities() {
    return this.form.get('arrayListActivities') as FormArray;
  }

  get arrayActivitiescheckBox() {
    return this.form.get('arrayActivitiescheckBox') as FormArray;
  }

  ChangeClassMaintenance() {
    this.activities = [];
    this.activitiesTemporal = [];
    this.sparePartsTemporal = [];
    while (this.arrayActivitiescheckBox.controls.length !== 0) {
      this.arrayActivitiescheckBox.removeAt(0);
    }

    while (this.arrayListActivities.controls.length !== 0) {
      this.arrayListActivities.removeAt(0);
    }
    this.form.controls.activities.setValue(false);

    if (this.form.controls.typeEngineId.value != '' && this.form.controls.maintenanceClassId.value != '') {
      const queryParams = { classId: this.form.value.maintenanceClassId, engineTypeId: this.form.value.typeEngineId };
      this._maintenanceService.GetSettingToCreate(queryParams).subscribe(
        response => {
          if (response.data.catalogMaintenance) {
            this.activities = response.data.catalogMaintenance;
            this.activities.forEach(item => {
              this.arrayActivitiescheckBox.push(
                this._fb.group({
                  id: new FormControl(item.id, [Validators.required]),
                  checked: new FormControl(item.isSelected),
                })
              );
            });

            this.activities.forEach(item => {
              this.activitiesTemporal.push(item);
            });
          }

          this.spareParts = response.data.spareParts;
          this.listPlanMaintenance = response.data.listPlansMaintenances;

          this.spareParts.forEach(item => {
            this.sparePartsTemporal.push(item);
          });
        },
        error => {
          this.messageService.error(
            'MAINTENANCES.MESSAGES.GET_TO_CREATE.ACTIVITIE',
            'MAINTENANCES.MESSAGES.GET_TO_CREATE.REGISTER_ACTIVITIE'
          );
        }
      );
    }
  }

  changeTypeMaintenance(event) {
    if (event.value == this.preventiveMaintenance) {
      this.form.controls['km'].setErrors(null);
      this.form.controls['totalAmount'].setErrors(null);
      this.form.controls['activities'].setErrors(null);
      this.form.controls['documentSparePart'].setErrors(null);
      this.form.controls['documentConformity'].setErrors(null);
      this.form.controls['documentVehicle'].setErrors(null);
    }
    if (event.value == this.correctiveMaintenance) {
      this.form.controls.km.enable();
      this.form.controls.totalAmount.enable();
      this.form.controls.activities.enable();
      this.form.controls.documentSparePart.enable();
      this.form.controls.documentConformity.enable();
      this.form.controls.documentVehicle.enable();
    }
    this.activities = [];
    this.form.controls.maintenanceClassId.setValue('');
    while (this.arrayActivitiescheckBox.controls.length !== 0) {
      this.arrayActivitiescheckBox.removeAt(0);
    }
  }

  addSpareParts(event) {
    this.sparePartsTemporal.forEach((item, index) => {
      if (item.id == event.value) {
        this.arrayListMaintenanceDetail.push(
          this._fb.group({
            itemId: new FormControl(item.id, [Validators.required]),
            description: new FormControl(item.name, [Validators.required]),
            quantity: new FormControl(1, [Validators.required]),
          })
        );
        this.sparePartsTemporal.splice(index, 1);
        this.form.controls.selectSpareParts.setValue('');
      }
    });
  }

  addActivities(event) {
    this.activitiesTemporal.forEach((item, index) => {
      if (item.id == event.value) {
        this.arrayListActivities.push(
          this._fb.group({
            itemId: new FormControl(item.id, [Validators.required]),
            description: new FormControl(item.activitie, [Validators.required]),
            quantity: new FormControl(1, [Validators.required]),
          })
        );
        this.activitiesTemporal.splice(index, 1);
        this.form.controls.selectActivities.setValue('');
      }
    });
  }

  changeActivities(event, index) {
    this.arrayActivitiescheckBox.at(index).value.checked = event.checked;
  }

  removeDataActivitie(i) {
    const data = this.arrayListActivities.controls[i].value;
    this.activities.forEach(item => {
      if (item.id == data.itemId) {
        this.activitiesTemporal.push(item);
      }
    });
    this.arrayListActivities.removeAt(i);
    this.activitiesTemporal.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  removeDataSpareParts(i) {
    const data = this.arrayListMaintenanceDetail.controls[i].value;
    this.spareParts.forEach(item => {
      if (item.id == data.itemId) {
        this.sparePartsTemporal.push(item);
      }
    });
    this.arrayListMaintenanceDetail.removeAt(i);
    this.sparePartsTemporal.sort(function (a, b) {
      return a.id - b.id;
    });
  }

  searchVehicle($event) {
    this.vehicleService.getVehicleByLicsensePlate($event.controls.licensePlate.value).subscribe(
      res => {
        this.vehicle = res.data;
        this.form.controls.typeEngine.setValue(res.data.engineType);
        this.form.controls.typeEngineId.setValue(res.data.engineTypeId);
        this.form.controls.vehicleId.setValue(this.vehicle.id);

        this.formCorrective.controls.typeEngine.setValue(res.data.engineType);
        this.formCorrective.controls.typeEngineId.setValue(res.data.engineTypeId);
        this.formCorrective.controls.vehicleId.setValue(this.vehicle.id);

        this.formPreventive.controls.typeEngine.setValue(res.data.engineType);
        this.formPreventive.controls.typeEngineId.setValue(res.data.engineTypeId);
        this.formPreventive.controls.vehicleId.setValue(this.vehicle.id);
      },
      error => {
        $event.controls.licensePlate.setValue('');
        this.vehicle = new GetVehicleByLicensePlate();
        this.messageService.error('PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED', 'PIP.CREATE.MESSAGES.SEARCH_VEHICLE.FAILED_TITLE');
      }
    );
  }
  ////FALTA ACABAR
  save(): void {
    this.loading = false;
    if (this.form.valid && this.form.controls.typeMaintenanceId.value == this.preventiveMaintenance) {
      var listMaintenanceDetail = [];
      var listActivities = [];
      for (let i = 0; i < this.arrayListMaintenanceDetail.length; i++) {
        listMaintenanceDetail.push({
          descriptionId: this.arrayListMaintenanceDetail.at(i).value.itemId,
          quantity: this.arrayListMaintenanceDetail.at(i).value.quantity,
          maintenanceDetailTypeId: this.preventiveMaintenance,
        });
      }

      for (let i = 0; i < this.arrayActivitiescheckBox.length; i++) {
        listActivities.push({
          activitieId: this.arrayActivitiescheckBox.at(i).value.id,
          isSelected: this.arrayActivitiescheckBox.at(i).value.checked,
        });
      }

      const maintenance: any = {
        vehicleId: this.form.value.vehicleId,
        typeMaintenanceId: this.form.value.typeMaintenanceId,
        planId: this.form.value.planId,
        maintenanceClassId: this.form.value.maintenanceClassId,
        maintenanceDate: this.datePipe.transform(this.form.value.date, 'YYYY-MM-dd'),
      };

      this._maintenanceService.add(maintenance).subscribe(
        response => {
          this.loading = true;
          this.registerMaintenanceModal.close();
        },
        error => {
          this.loading = true;
        }
      );
    }
    // type corrective
    if (this.form.valid && this.form.controls.typeMaintenanceId.value == this.correctiveMaintenance) {
      var listMaintenanceDetail = [];
      var listActivities = [];
      for (let i = 0; i < this.arrayListMaintenanceDetail.length; i++) {
        listMaintenanceDetail.push({
          descriptionId: this.arrayListMaintenanceDetail.at(i).value.itemId,
          quantity: this.arrayListMaintenanceDetail.at(i).value.quantity,
          maintenanceDetailTypeId: this.preventiveMaintenance,
        });
      }

      for (let i = 0; i < this.arrayListActivities.length; i++) {
        listMaintenanceDetail.push({
          descriptionId: this.arrayListActivities.at(i).value.itemId,
          quantity: this.arrayListActivities.at(i).value.quantity,
          maintenanceDetailTypeId: this.correctiveMaintenance,
        });
      }

      const maintenance: any = {
        vehicleId: this.form.value.vehicleId,
        typeMaintenanceId: this.form.value.typeMaintenanceId,
        planId: this.form.value.planId,
        maintenanceClassId: this.form.value.maintenanceClassId,
        odometer: this.form.value.km,
        amount: this.form.value.totalAmount,
        maintenanceDate: this.datePipe.transform(this.form.value.date, 'YYYY-MM-dd'),
        listMaintenanceDetail: listMaintenanceDetail,
        listCatalog: {
          maintenanceClassId: this.form.value.maintenanceClassId,
          engineTypeId: this.form.value.typeEngineId,
          listActivities: listActivities,
        },
        documentSparePart: this.form.value.documentSparePart,
        documentConformity: this.form.value.documentConformity,
        documentVehicle: this.form.value.documentVehicle,
      };

      this._maintenanceService.add(maintenance).subscribe(
        response => {
          this.loading = true;
          this.registerMaintenanceModal.close();
        },
        error => {
          this.loading = true;
        }
      );
    }
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  SendDataSpareParts(event) {
    this.form.controls['spareParts'].setValue(event);
  }

  SendDataActivities(event) {
    this.form.controls['activitiesCorrective'].setValue(event);
  }

  receiveDocumentSparePart(event) {
    this.form.controls['documentSparePart'].setValue(event.newDocument);
  }

  receiveDocumentConformity(event) {
    this.form.controls['documentConformity'].setValue(event.newDocument);
  }

  receiveDocumentVehicle(event) {
    this.form.controls['documentVehicle'].setValue(event.newDocument);
  }

  ChangeDate(event) {
    this.form.controls['date'].setValue('');
    const value = this.listPlanMaintenance.filter(plan => plan.id == event);
    this.selectPlanMaintenance = {
      ...value[0],
      toDateString: value[0]?.toDate,
      tofromDateString: value[0]?.fromDate,
      toDate: new Date(this.revertDate(value[0]?.toDate)),
      fromDate: new Date(this.revertDate(value[0]?.fromDate)),
    };
  }

  revertDate(date): string {
    let fecha = date;
    const [day, mounth, year] = fecha.split('/');
    let response = `${year}/${mounth}/${day}`;
    return response;
  }

  filterDate = (d: Date): boolean => {
    return this.selectPlanMaintenance?.fromDate <= d && this.selectPlanMaintenance.toDate >= d;
  };
}
