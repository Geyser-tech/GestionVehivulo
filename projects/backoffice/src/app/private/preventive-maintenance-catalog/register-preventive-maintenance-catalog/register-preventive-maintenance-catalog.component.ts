import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { TranslateService } from '@ngx-translate/core';
import { catalogService } from '../shared/services/preventive-maintenance-catalog.services';

@Component({
  selector: 'cad-register-preventive-maintenance-catalog',
  templateUrl: './register-preventive-maintenance-catalog.component.html',
  styleUrls: ['./register-preventive-maintenance-catalog.component.scss'],
  providers: [DatePipe],
})
export class RegisterPreventiveMaintenanceCatalogComponent implements OnInit {
  catalogForm: FormGroup;
  columns: any[];
  actions: any[];
  data: any[] = [];
  arrayForm!: FormGroup;
  //Masters
  maintenanceClass: any[];
  engineTypes: any[];
  activities: any[];

  //name
  nameArray: string[] = [];
  catalogName: string;

  constructor(
    private fb: FormBuilder,
    private catalogservice: catalogService,
    private _translate: TranslateService,
    private datePipe: DatePipe,
    private registerCatalogMaintenanceModal: MatDialogRef<RegisterPreventiveMaintenanceCatalogComponent>,
    private _msgService: MessagingService
  ) {
    this.catalogForm = this.fb.group({
      //  version: new FormControl('', [Validators.required]),
      maintenanceClass: new FormControl('', [Validators.required]),
      engineType: new FormControl('', [Validators.required]),
      fromDate: new FormControl('', [Validators.required]),
      activities: new FormControl(''),
      catalogName: new FormControl(this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.NAME_CATALOG')),
    });
    this.columns = [{ field: 'name', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.ACTIVITIES') }];
    this.actions = [0, 0, 1];
    this.nameArray[0] = this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.NAME_CATALOG');
    this.nameArray.forEach(x => {
      this.catalogName = x;
    });
  }

  ngOnInit(): void {
    this.getSettingsToCreate();
  }
  getSettingsToCreate() {
    this.catalogservice.getSettingsToCreate().subscribe(res => {
      this.engineTypes = res.data.engineType;
      this.maintenanceClass = res.data.maintenanceClass;
      this.activities = res.data.activities;
    });
  }
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
  setVersionName() {
    this.nameArray[3] = '-VERSIÓN ' + this.catalogForm.controls.version.value;
    this.catalogName = '';
    this.nameArray.forEach(x => {
      this.catalogName = this.catalogName + x;
    });
  }

  setClassName() {
    this.nameArray[1] = ' CLASE ' + ' ' + this.catalogForm.controls.maintenanceClass.value.name;
    this.catalogName = '';
    this.nameArray.forEach(x => {
      this.catalogName = this.catalogName + x + ' ';
    });
  }
  setEngineTypeName() {
    this.nameArray[2] = this.catalogForm.controls.engineType.value.name;
    this.catalogName = '';
    this.nameArray.forEach(x => {
      this.catalogName = this.catalogName + x + ' ';
    });
  }

  deleteActivitie($event) {
    this.data.map((a: any, index: any) => {
      if ($event.id == a.id) {
        this.data.splice(index, 1);
        this.activities.push($event);
      }
    });
    this.catalogForm.controls.activities.setValue('');
    this.catalogForm.controls.activities.markAsPristine();
    this.catalogForm.controls.activities.markAsUntouched();
  }

  selectActivitie($event) {
    this.data.push($event.value);
    this.activities.map((a: any, index: any) => {
      if ($event.value.id == a.id) {
        this.activities.splice(index, 1);
      }
    });
    this.catalogForm.controls.activities.setValue('');
    this.catalogForm.controls.activities.markAsPristine();
    this.catalogForm.controls.activities.markAsUntouched();
  }
  save() {
    console.log(this.catalogForm);
    if (this.catalogForm.valid && this.data.length > 0) {
      const catalogMaintenanceCommand = {
        catalogMaintenanceParameter: {
          Name: this.catalogName,
          MaintenanceClassId: this.catalogForm.controls.maintenanceClass.value.id,
          EngineTypeId: this.catalogForm.controls.engineType.value.id,
          IssueDate: this.datePipe.transform(this.catalogForm.controls.fromDate.value, 'YYYY/MM/dd'),
          Activities: this.data.map(x => {
            return x.id;
          }),
        },
      };
      this.catalogservice.createCatalogMaintenance(catalogMaintenanceCommand).subscribe(
        res => {
          this._msgService.success(
            'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.ADD.SUCCESS',
            'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.ADD.SUCCESS_TITLE'
          );
          this.registerCatalogMaintenanceModal.close();
          this.catalogservice.filter('');
        },
        error => {
          if (error.error.errors != null) {
            this._msgService.error(
              'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.ADD.FAILED',
              'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.ADD.FAILED_TITLE'
            );
          } else {
            this._msgService.error(error.error.title, 'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.ADD.FAILED_TITLE');
          }
        }
      );
    }
  }
}
