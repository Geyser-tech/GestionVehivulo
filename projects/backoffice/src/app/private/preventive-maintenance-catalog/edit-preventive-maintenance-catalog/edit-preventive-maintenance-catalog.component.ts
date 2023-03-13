import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { TranslateService } from '@ngx-translate/core';
import { catalogService } from '../shared/services/preventive-maintenance-catalog.services';

@Component({
  selector: 'cad-edit-preventive-maintenance-catalog',
  templateUrl: './edit-preventive-maintenance-catalog.component.html',
  styleUrls: ['./edit-preventive-maintenance-catalog.component.scss'],
  providers: [DatePipe],
})
export class EditPreventiveMaintenanceCatalogComponent implements OnInit {
  catalogForm: FormGroup;
  columns: any[];
  actions: any[];
  catalogMaintenance:any;
  activities:any;
  catalogMaintenanceState:any;

  private STATE_LAPSED: string = this.getTranslation('PIP.SHOW_PIP.STATES.LAPSED');
  private STATE_ACTIVE: string = this.getTranslation('PIP.SHOW_PIP.STATES.ACTIVE');
  //MASTERS
  activitiesMasters:any;
  engineTypeMasters:any;
  maintenanceClassMasters:any;

 //Parameters
  catalogMaintenanceStateActiveParameter:number;
  catalogMaintenanceLapsedParameter:number;
  constructor(private fb: FormBuilder, private catalogservice: catalogService, @Inject(MAT_DIALOG_DATA) public data: any,
  private _translate: TranslateService, private registerCatalogMaintenanceModal: MatDialogRef<EditPreventiveMaintenanceCatalogComponent>,
  private _msgService: MessagingService, private datePipe: DatePipe) {
    this.columns = [{ field: 'name', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.ACTIVITIES') }];
    this.actions = [0, 0, 1];

  }
  ngOnInit(): void {

    this.getCatalogMaintenance();
  }
  getCatalogMaintenance(){
    this.catalogservice.getCatalogMaintenanceById(this.data.Id).subscribe(res=>{
      this.catalogMaintenance=res.data;
      this.catalogMaintenanceStateActiveParameter= res.data.catalogMaintenanceStateActive;
      this.catalogMaintenanceLapsedParameter= res.data.catalogMaintenanceStateLapsed;
      this.setStateCatalogMaintenance();
      this.createEditForm();
      this.getAllSettingsToCreateCatalogMaintenance();
    });
  }
  createEditForm():void{
    console.log(this.catalogMaintenance);
    this.catalogForm = this.fb.group({
      issueDate: new FormControl(this.catalogMaintenance.issueDate, [Validators.required]),
      activities: new FormControl('')
    });
  }

  getAllSettingsToCreateCatalogMaintenance(){
this.catalogservice.getSettingsToCreate().subscribe(res=>{
  this.activitiesMasters=res.data.activities;
  this.engineTypeMasters= res.data.engineType;
  this.maintenanceClassMasters= res.data.maintenanceClass;
  this.setActivitiesMasterDetailDefault();

})
  }
  setActivitiesMasterDetailDefault(){
     this.catalogMaintenance.activities.map((a:any, index:any)=>{
       this.activitiesMasters.map((b:any, index:any)=>{
        if(b.id==a.id){
          this.activitiesMasters.splice(index, 1);
       }
       });
    });
  }
  deleteActivitie($event) {
    this.catalogMaintenance.activities.map((a:any, index:any)=>{
      if($event.id==a.id){
        this.catalogMaintenance.activities.splice(index, 1);
        this.activitiesMasters.push($event);
      }
    });
    this.catalogForm.controls.activities.setValue('');
    this.catalogForm.controls.activities.markAsPristine();
    this.catalogForm.controls.activities.markAsUntouched();
  }

  setActivitie($event){
    this.catalogMaintenance.activities.push($event.value);
    this.activitiesMasters.map((a:any, index:any)=>{
      if($event.value.id==a.id){
        this.activitiesMasters.splice(index, 1);
      }
    });
    this.catalogForm.controls.activities.setValue('');
    this.catalogForm.controls.activities.markAsPristine();
    this.catalogForm.controls.activities.markAsUntouched();
  }

  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }


editCatalogMaintenance(){
  if(this.catalogForm.valid && this.catalogMaintenance.activities.length>0){
    this.catalogMaintenance.issueDate=this.datePipe.transform(this.catalogForm.controls.issueDate.value, 'YYYY/MM/dd') ;
    this.catalogservice.updateCatalogMaintenance(this.catalogMaintenance).subscribe(res=>{
        this.registerCatalogMaintenanceModal.close();
        this._msgService.success('PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.UPDATE.SUCCESS','PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.UPDATE.SUCCESS_TITLE');
        this.catalogservice.filter("");        
    }, error=>{
      this._msgService.error('PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.UPDATE.FAILED', 'PREVENTIVE_MAINTENANCE_CATALOG.MESSAGES.UPDATE.FAILED_TITLE');
    });
  }
}

setStateCatalogMaintenance(){
  if(this.catalogMaintenance.state == this.catalogMaintenanceLapsedParameter){
      this.catalogMaintenanceState = this.STATE_LAPSED;
   } else this.catalogMaintenanceState = this.STATE_ACTIVE;
  }
}
