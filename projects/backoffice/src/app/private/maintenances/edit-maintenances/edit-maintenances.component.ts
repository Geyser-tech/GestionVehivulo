import { Component, OnInit, Inject } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { GetVehicleByLicensePlate } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-license-plate.interface';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { TranslateService } from '@ngx-translate/core';
import { MaintenancesService } from '../shared/services/maintenances-service.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { PlanMaintenanceService } from '../shared/services/plan-maintenance.service';

@Component({
  selector: 'cad-edit-maintenances',
  templateUrl: './edit-maintenances.component.html',
  styleUrls: ['./edit-maintenances.component.scss'],
  providers: [DatePipe],
})
export class EditMaintenancesComponent implements OnInit {
  loading: boolean = true;
  form!: FormGroup;
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
  planMaintenanceData: any;

  preventiveMaintenance: number = 0;
  correctiveMaintenance: number = 0;
  valueTypeMaintenance: number = 0;
  dataMaintenance: any;
  initial: boolean = false;

  vehicle: GetVehicleByLicensePlate;

  planStateApprovedParameter: any;
  planStateExpireParameter: any;
  planStateRegisterdParameter: any;

  maintenanceStateRegisteredParameter: any;
  maintenanceStateExecutedParameter: any;
  maintenanceStateNotExecutedParameter: any;
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
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _fb: FormBuilder,
    private datePipe: DatePipe,
    private _translate: TranslateService,
    private vehicleService: VehicleService,
    private messageService: MessagingService,
    private _maintenanceService: MaintenancesService,
    private _planMaintenanceService: PlanMaintenanceService,
    private registerMaintenanceModal: MatDialogRef<EditMaintenancesComponent>
  ) {
    this.dataInitial();
  }

  ngOnInit(): void {}

  dataInitial() {
    this._maintenanceService.getAllSettingsToList().subscribe(response => {
      this.preventiveMaintenance = response.data.preventiveMaintenance;
      this.typeMaintenance = response.data.typeMaintenance;
      this.classMaintencances = response.data.maintenanceClass;
      this.correctiveMaintenance = response.data.correctiveMaintenance;
      this.getMaintenance();
    });
  }

  getMaintenance() {
    this._maintenanceService.getMaintenanceById(this.data.Id).subscribe(response => {
      this.dataMaintenance = response.data;
      this.planStateExpireParameter = response.data.planStateExpireParameter;
      this.planStateRegisterdParameter = response.data.planStateRegisterdParameter;
      this.planStateApprovedParameter = response.data.planStateApprovedParameter;

      this.maintenanceStateRegisteredParameter = response.data.maintenanceStateRegisteredParameter;
      this.maintenanceStateExecutedParameter = response.data.maintenanceStateExecutedParameter;
      this.maintenanceStateNotExecutedParameter = response.data.maintenanceStateNotExecutedParameter;

      this.reactiveForm();
    });
  }

  reactiveForm() {
    const formControls = {
      id: new FormControl(this.dataMaintenance.id, [Validators.required]),
      vehicleId: new FormControl(this.dataMaintenance.vehicle.id, [Validators.required]),

      typeMaintenanceId: new FormControl(this.dataMaintenance.typeMaintenanceId, [Validators.required]),
      maintenanceClassId: new FormControl(this.dataMaintenance.maintenanceClassId, [Validators.required]),
      typeEngine: new FormControl(this.dataMaintenance.vehicle.engineType, [Validators.required]),
      typeEngineId: new FormControl(this.dataMaintenance.vehicle.engineTypeId, [Validators.required]),
      km: new FormControl(this.dataMaintenance.odometer, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      date: new FormControl(new Date(this.dataMaintenance.maintenanceDate), [Validators.required]),
      executeDate: new FormControl(new Date(this.dataMaintenance.maintenanceDate), [Validators.required]),
      totalAmount: new FormControl(this.dataMaintenance.amount, [Validators.required, Validators.pattern(/^[0-9]+(.[0-9]+)?$/i)]),
      planId: new FormControl(this.dataMaintenance.planId, [Validators.required]),
      activities: new FormControl(''),

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

    if (
      this.dataMaintenance.state != this.maintenanceStateRegisteredParameter ||
      this.dataMaintenance.planState != this.planStateRegisterdParameter
    ) {
      this.form.controls.typeEngine.disable();
      this.form.controls.maintenanceClassId.disable();
      this.form.controls.planId.disable();
      this.form.controls.date.disable();
    } else {
      this.form.controls.typeEngine.disable();
      this.form.controls.totalAmount.disable();
      this.form.controls.km.disable();
      this.form.controls.planId.disable();
      this.form.controls.executeDate.disable();
    }

    this.ChangeClassMaintenance();
    this.form.controls.planId.setValue(this.dataMaintenance.planId);
    this.setArrayForm();
    this.initial = true;
  }

  setArrayForm() {
    this.activities = [];

    this.dataMaintenance.maintenanceDetail.forEach(item => {
      if (item.maintenanceDetailTypeId == this.preventiveMaintenance) {
        this.arrayListMaintenanceDetail.push(
          this._fb.group({
            id: new FormControl(item.id, []),
            maintenanceId: new FormControl(this.dataMaintenance.id, []),
            itemId: new FormControl(item.descriptionId, [Validators.required]),
            maintenanceDetailTypeId: new FormControl(item.maintenanceDetailTypeId, [Validators.required]),
            description: new FormControl(item.description, [Validators.required]),
            quantity: new FormControl(item.quantity, [Validators.required]),
          })
        );
      } else if (item.maintenanceDetailTypeId == this.correctiveMaintenance) {
        this.arrayListActivities.push(
          this._fb.group({
            id: new FormControl(item.id, []),
            maintenanceId: new FormControl(this.dataMaintenance.id, []),
            itemId: new FormControl(item.descriptionId, [Validators.required]),
            maintenanceDetailTypeId: new FormControl(item.maintenanceDetailTypeId, [Validators.required]),
            description: new FormControl(item.description, [Validators.required]),
            quantity: new FormControl(item.quantity, [Validators.required]),
          })
        );
      }
    });
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
    this.spareParts = [];
    this.sparePartsTemporal = [];
    while (this.arrayActivitiescheckBox.controls.length !== 0) {
      this.arrayActivitiescheckBox.removeAt(0);
    }

    while (this.arrayListActivities.controls.length !== 0) {
      this.arrayListActivities.removeAt(0);
    }
    // this.form.controls.activities.setValue(false);

    if (this.form.controls.typeEngineId.value != '' && this.form.controls.maintenanceClassId.value != '') {
      const queryParams = {
        classId: this.form.controls.maintenanceClassId.value,
        engineTypeId: this.form.value.typeEngineId,
        edit: true,
      };

      this._maintenanceService.GetSettingToCreate(queryParams).subscribe(
        response => {
          this.spareParts = response.data.spareParts;
          this.listPlanMaintenance = response.data.listPlansMaintenances;
          this.planMaintenanceData = response.data.catalogMaintenanceData;

          this.spareParts.forEach(item => {
            this.sparePartsTemporal.push(item);
          });
          if (response.data.catalogMaintenance) {
            this.activities = response.data.catalogMaintenance;
            ///////////////////////////
            if (this.initial == true && this.dataMaintenance.activities.length != 0) {
              this.activities = [];
              this.dataMaintenance.activities.forEach(item => {
                this.activities.push(item);
              });
            }
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
            if (this.initial == true) {
              this.dataMaintenance.maintenanceDetail.forEach(item => {
                if (item.maintenanceDetailTypeId == this.correctiveMaintenance) {
                  this.activitiesTemporal.forEach((activitie, indexactivitie) => {
                    if (item.descriptionId == activitie.activitieId) {
                      this.activitiesTemporal.splice(indexactivitie, 1);
                    }
                  });
                }
                if (item.maintenanceDetailTypeId == this.preventiveMaintenance) {
                  this.sparePartsTemporal.forEach((spareParts, indexSpareParts) => {
                    if (item.descriptionId == spareParts.id) {
                      this.sparePartsTemporal.splice(indexSpareParts, 1);
                    }
                  });
                }
              });
              this.initial = false;
            }
          }
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

  changeTypeMaintenance() {
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
    this.form.controls.maintenanceClassId.enable();
    this.form.controls.typeEngine.enable();
    this.form.controls.planId.enable();
    this.form.controls.date.enable();
    if (this.form.valid && this.form.controls.typeMaintenanceId.value == this.preventiveMaintenance) {
      var listMaintenanceDetail = [];
      var listActivities = [];
      for (let i = 0; i < this.arrayListMaintenanceDetail.length; i++) {
        listMaintenanceDetail.push({
          id: this.arrayListMaintenanceDetail.at(i).value.id,
          maintenanceId: this.dataMaintenance.id,
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
        id: this.form.value.id,
        vehicleId: this.form.value.vehicleId,
        typeMaintenanceId: this.form.value.typeMaintenanceId,
        planId: this.form.value.planId,
        maintenanceClassId: this.form.value.maintenanceClassId,
        odometer: this.form.value.km,
        amount: this.form.value.totalAmount,
        maintenanceDate: this.datePipe.transform(this.form.value.date, 'YYYY-MM-dd'),
        executeDate: this.datePipe.transform(this.form.value.executeDate, 'YYYY-MM-dd'),
        listMaintenanceDetail: listMaintenanceDetail,
        listCatalog: {
          maintenanceClassId: this.form.value.maintenanceClassId,
          engineTypeId: this.form.value.typeEngineId,
          listActivities: listActivities,
          catalogName: this.planMaintenanceData.name,
          catalogVersion: this.planMaintenanceData.version,
          issueDate: this.planMaintenanceData.issueDate,
          toDate: this.planMaintenanceData.toDate,
        },
        documentSparePart: this.form.value.documentSparePart,
        documentConformity: this.form.value.documentConformity,
        documentVehicle: this.form.value.documentVehicle,
      };
      this._maintenanceService.updateMaintenance(maintenance).subscribe(response => {
        this.loading = true;
        this.registerMaintenanceModal.close();
        this._planMaintenanceService.filter('update-maintenance');
      });
    }
    // type corrective
    if (this.form.valid && this.form.controls.typeMaintenanceId.value == this.correctiveMaintenance) {
      var listMaintenanceDetail = [];
      var listActivities = [];
      for (let i = 0; i < this.arrayListMaintenanceDetail.length; i++) {
        listMaintenanceDetail.push({
          id: this.arrayListMaintenanceDetail.at(i).value.id,
          descriptionId: this.arrayListMaintenanceDetail.at(i).value.itemId,
          quantity: this.arrayListMaintenanceDetail.at(i).value.quantity,
          maintenanceDetailTypeId: this.preventiveMaintenance,
          maintenanceId: this.dataMaintenance.id,
        });
      }

      for (let i = 0; i < this.arrayListActivities.length; i++) {
        listMaintenanceDetail.push({
          id: this.arrayListActivities.at(i).value.id,
          descriptionId: this.arrayListActivities.at(i).value.itemId,
          quantity: this.arrayListActivities.at(i).value.quantity,
          maintenanceDetailTypeId: this.correctiveMaintenance,
          maintenanceId: this.dataMaintenance.id,
        });
      }

      const maintenance: any = {
        id: this.form.value.id,
        vehicleId: this.form.value.vehicleId,
        typeMaintenanceId: this.form.value.typeMaintenanceId,
        planId: this.form.value.planId,
        maintenanceClassId: this.form.value.maintenanceClassId,
        odometer: this.form.value.km,
        amount: this.form.value.totalAmount,
        maintenanceDate: this.datePipe.transform(this.form.value.date, 'YYYY-MM-dd'),
        listMaintenanceDetail: listMaintenanceDetail,
        documentSparePart: this.form.value.documentSparePart,
        documentConformity: this.form.value.documentConformity,
        documentVehicle: this.form.value.documentVehicle,
      };
      this.form.controls.maintenanceClassId.disable();
      this.form.controls.typeEngine.disable();
      this.form.controls.planId.disable();
      this.form.controls.date.disable();

      this._maintenanceService.updateMaintenance(maintenance).subscribe(response => {
        this.loading = true;
        this.registerMaintenanceModal.close();
      });
    }
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }

  // DOCUMENT VEHICLE
  btn_upload_vehicle() {
    const fileUpload = document.getElementById('fileUpload_vehicle') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove_vehicle() {
    this.fileVehicle = '';
  }

  fileUploaded_vehicle(event: any) {
    this.fileVehicle = event.target.files[0];
    this.form.controls['documentVehicle'].setValue(this.fileVehicle);
  }
  // DOCUMENT CONFORMITY
  btn_upload_conformity() {
    const fileUpload = document.getElementById('fileUpload_conformity') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove_conformity() {
    this.fileConformity = '';
  }

  fileUploaded_conformity(event: any) {
    this.fileConformity = event.target.files[0];
    this.form.controls['documentConformity'].setValue(this.fileConformity);
  }
  // DOCUMENT SPARE_PARTS
  btn_upload_spareParts() {
    const fileUpload = document.getElementById('fileUpload_spareParts') as HTMLInputElement;
    fileUpload.click();
  }

  btn_remove_spareParts() {
    this.fileSparePart = '';
  }

  fileUploaded_spareParts(event: any) {
    this.fileSparePart = event.target.files[0];
    this.form.controls['documentSparePart'].setValue(this.fileSparePart);
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
}
