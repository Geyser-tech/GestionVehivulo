/* eslint-disable no-return-assign */
/* eslint-disable no-console */
import { DatePipe } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MessagingService } from '@cad-core/services';
import { TranslateService } from '@ngx-translate/core';
import { catalogService } from '../shared/services/preventive-maintenance-catalog.services';

@Component({
  selector: 'cad-clone-catalog-activities',
  templateUrl: './clone-catalog-activities.component.html',
  styleUrls: ['./clone-catalog-activities.component.scss'],
  providers: [DatePipe]
})
export class CloneCatalogActivitiesComponent implements OnInit {
  catalogForm: FormGroup;
  columns: any[];
  actions: any[];
  catalogMaintenance:any;
  activities:any;
  catalogMaintenanceState:any;


  nameArray:string[]=[];
  catalogName:string;
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
  private _translate: TranslateService, private registerCatalogMaintenanceModal: MatDialogRef<CloneCatalogActivitiesComponent>,
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

      this.nameArray[0]=(this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.NAME_CATALOG'));
      this.nameArray.forEach(x=>{
        this.catalogName= x;
      });
    });
  }
  createEditForm():void{
    this.catalogForm = this.fb.group({
      maintenanceClass: new FormControl('', [Validators.required]),
      engineType: new FormControl(this.catalogMaintenance.engineType, [Validators.required]),
      issueDate: new FormControl('', [Validators.required]),
      catalogName : new FormControl(this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.NAME_CATALOG')),
      activities: new FormControl('')
    });
  }

  getAllSettingsToCreateCatalogMaintenance(){
this.catalogservice.getSettingsToCreate().subscribe(res=>{
  this.activitiesMasters=res.data.activities;
  this.engineTypeMasters= res.data.engineType;
  this.maintenanceClassMasters= res.data.maintenanceClass;

  this.setDefaultValueMasters('maintenanceClass', this.maintenanceClassMasters, this.catalogMaintenance.maintenanceClass);
  this.setDefaultValueMasters('engineType', this.engineTypeMasters, this.catalogMaintenance.engineType);
  this.setVersionName();
  this.setClassName();
  this.setEngineTypeName();
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

  setDefaultValueMasters(nameControl: string, masterDetails: any[], searchValue: string) {
    const toSelect = masterDetails.find(c => c.name == searchValue);
    this.catalogForm.get(nameControl).setValue(toSelect);
  }
  getTranslation(transKey: string | string[], interpolateParams?: object) {
    return this._translate.instant(transKey, interpolateParams);
  }
  setVersionName(){
  //   this.nameArray[3]=("-VERSIÓN " + this.catalogForm.controls.version.value);
  //   this.catalogName='';
  //   this.nameArray.forEach(x=>{
  //    this.catalogName= this.catalogName+x;
  //  });
  }

  setClassName(){
   this.nameArray[1]=(" CLASE " + " "+  this.catalogForm.controls.maintenanceClass.value.name);
   this.catalogName='';
   this.nameArray.forEach(x=>{
    this.catalogName= this.catalogName+x+' ';
  });
  }
  setEngineTypeName(){
   this.nameArray[2]=(" "+this.catalogForm.controls.engineType.value.name);
   this.catalogName='';
   this.nameArray.forEach(x=>{
    this.catalogName= this.catalogName+x+' ';
  });
}

editCatalogMaintenance(){
  if(this.catalogForm.valid && this.catalogMaintenance.activities.length>0){
    const cloneCatalogMaintenance={
      CloneCatalogMaintenanceDTO:{
        name:this.catalogName,
        maintenanceClassId:this.catalogForm.controls.maintenanceClass.value.id,
        engineTypeId:this.catalogForm.controls.engineType.value.id,
        issueDate:this.datePipe.transform(this.catalogForm.controls.issueDate.value, 'YYYY/MM/dd'),
        activities:this.catalogMaintenance.activities
      }
    };

    this.catalogservice.cloneCatalogMaintenance(cloneCatalogMaintenance).subscribe(res=>{
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
