
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditPreventiveMaintenanceCatalogComponent } from '../edit-preventive-maintenance-catalog/edit-preventive-maintenance-catalog.component';
import { CloneCatalogActivitiesComponent } from '../clone-catalog-activities/clone-catalog-activities.component';
import { catalogService } from '../shared/services/preventive-maintenance-catalog.services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cad-show-preventive-maintenance-catalog',
  templateUrl: './show-preventive-maintenance-catalog.component.html',
  styleUrls: ['./show-preventive-maintenance-catalog.component.scss'],
})
export class ShowPreventiveMaintenanceCatalogComponent implements OnInit {
  constructor(public dialog: MatDialog, private catalogMaintenanceService:catalogService,
    @Inject(MAT_DIALOG_DATA) public data: any, private _translate: TranslateService) {

      this.catalogMaintenanceService.listen().subscribe((m:any)=>{    
        this.getCatalogMaintenanceById();
      });
    }
    catalogMaintenance:any;
    columns:any;
    actions:any;
    catalogMaintenanceState:any;
    private STATE_LAPSED: string = this.getTranslation('PIP.SHOW_PIP.STATES.LAPSED');
    private STATE_ACTIVE: string = this.getTranslation('PIP.SHOW_PIP.STATES.ACTIVE');
      //Parameters
   catalogMaintenanceStateActiveParameter:number;
   catalogMaintenanceLapsedParameter:number;

  ngOnInit(): void {
    this.getCatalogMaintenanceById();
    this.columns = [
      { field: 'name', header: this.getTranslation('PREVENTIVE_MAINTENANCE_CATALOG.CATALOG.EXERCISE')},
    ];
    this.actions = [0, 0, 0];
  }

  editCatalog(): void {
    const dialogRef = this.dialog.open(EditPreventiveMaintenanceCatalogComponent, { disableClose: true, data:{
      Id:this.data.Id
    } });
  }

  cloneCatalogActivities(): void {
    const dialogRef = this.dialog.open(CloneCatalogActivitiesComponent, { disableClose: true, data:{
      Id:this.data.Id}});
  }
      //Traductions
      getTranslation(transKey: string | string[], interpolateParams?: object) {
        return this._translate.instant(transKey, interpolateParams);
      }
   setStateCatalogMaintenance(){
   if(this.catalogMaintenance.state == this.catalogMaintenanceLapsedParameter){
       this.catalogMaintenanceState = this.STATE_LAPSED;
    } else this.catalogMaintenanceState = this.STATE_ACTIVE;
   }

   getCatalogMaintenanceById(){
    this.catalogMaintenanceService.getCatalogMaintenanceById(this.data.Id).subscribe(
      res=>{
        this.catalogMaintenanceStateActiveParameter= res.data.catalogMaintenanceStateActive;
        this.catalogMaintenanceLapsedParameter= res.data.catalogMaintenanceStateLapsed;
        this.catalogMaintenance=res.data;
        this.setStateCatalogMaintenance();
      }
    );
   }
}
