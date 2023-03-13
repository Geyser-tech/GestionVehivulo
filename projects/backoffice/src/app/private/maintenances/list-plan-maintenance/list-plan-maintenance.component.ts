import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '@cad-private/vehicles/shared/services/vehicle-service.service';
import { RegisterPlanMaintenanceComponent } from '../register-plan-maintenance/register-plan-maintenance.component';
import { PlanMaintenanceService } from '../shared/services/plan-maintenance.service';
import { ShowMaintenancesComponent } from '../show-maintenances/show-maintenances.component';
import { ShowPlanMaintenanceComponent } from '../show-plan-maintenance/show-plan-maintenance.component';
import { ConfirmApprovedPlanComponent } from './confirm-approved-plan/confirm-approved-plan.component';
import { ConfirmDeleteMaintenanceComponent } from './confirm-delete-maintenance/confirm-delete-maintenance.component';

@Component({
  selector: 'cad-list-plan-maintenance',
  templateUrl: './list-plan-maintenance.component.html',
  styleUrls: ['./list-plan-maintenance.component.scss'],
  providers: [DatePipe]
})
export class ListPlanMaintenanceComponent implements OnInit {
  constructor(public dialog: MatDialog,
    private planMaintenanceService: PlanMaintenanceService,
    private fb: FormBuilder,private datePipe: DatePipe) {}
  frecuencyDates:any;
  vehicles:any;
  maintenanceCatalog:any[]=[];
  arrayFinal:any[]=[];

  filterForm: FormGroup;

  vehiclePlanMaintenances:any;
  vehicleMaintenances:any;
  vehicleMaintenanceHeader:any;


  //parameters
  stateApprovedParameter:number;
  stateExpiredParameter:number;
  stateRegisteredParameter:number;

  maintenanceStateExecutedParameter:any;
  maintenanceStateNotExecutedParameter:any;
  maintenanceStateRegisteredParameter:any;

  //Masters
  areasMaster:any;
  engineTypeMaster:any;

  //filtered
  areasFiltered:any[];
  engineTypeFiltered:any[];

  planMaintenancesActiveHeaderGenerator2:any;


  dateGeneric = new Date("0001-01-01T00:00:00");

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      fromDate: new FormControl('', [Validators.required]),
      toDate: new FormControl('', [Validators.required]),
    });

    console.log(this.dateGeneric);

    this.getAllVehiclePlanMaintenances();
    this.getAllVehicleMaintenance();
    this.getAllSettingsToList();
    // this.GetAllPlanMaintenancesToList();

    this.planMaintenanceService.listen().subscribe(res=>{
      this.getAllVehiclePlanMaintenances();
      this.getAllVehicleMaintenance();
    });
  }
 
  getAllSettingsToList(){
    this.planMaintenanceService.GetAllSettingsToList().subscribe(res=>{
      this.stateRegisteredParameter= res.data.stateRegistered;
      this.stateApprovedParameter = res.data.stateApproved;
      this.stateExpiredParameter= res.data.stateExpired;

      this.maintenanceStateExecutedParameter=res.data.maintenanceStateExecutedParameter;
      this.maintenanceStateNotExecutedParameter=res.data.maintenanceStateNotExecutedParameter;
      this.maintenanceStateRegisteredParameter=res.data.maintenanceStateRegisteredParameter;

      this.areasMaster= res.data.areas;
      this.engineTypeMaster= res.data.engineTypes;
      console.log(this.maintenanceStateNotExecutedParameter);

    })
  }

  getAllVehiclePlanMaintenances(){
    this.planMaintenanceService.getAllVehiclePlanMaintenanceActive().subscribe(res=>{
      this.vehiclePlanMaintenances= res.vehiclePlanGenerator;
      console.log(this.vehiclePlanMaintenances);
      this.planMaintenancesActiveHeaderGenerator2= res.vehicleMaintenanceHeaderGenerator;
    })
  }

  getAllVehicleMaintenance(){
    this.planMaintenanceService.getAllVehicleMaintenance().subscribe(res=>{
      this.vehicleMaintenances= res.vehicleMaintenance;
      console.log(this.vehicleMaintenances);
      this.vehicleMaintenanceHeader= res.vehicleMaintenanceHeader;
    })
  }

  openRegister(): void {
    const dialogRef = this.dialog.open(RegisterPlanMaintenanceComponent, { disableClose: true });
  }
  generateAllPlanMaintenance(){
    const parameter={
      VehiclePlanMaintenance:this.vehiclePlanMaintenances
    };
    this.planMaintenanceService.createMaintenancesByPlanMaintenance(parameter).subscribe(res=>{
      this.planMaintenanceService.filter('SuggestionPlanAproved');
    })
  }

  ApprovePlan(idPlanMaintenance:number){
    const dialogRef = this.dialog.open(ConfirmApprovedPlanComponent, { disableClose: true , data:{
      planMaintenanceId:idPlanMaintenance
    }});
  }
  deleteMaintenance(maintenanceId:number){
    const deleteMaintenanceDialog= this.dialog.open(ConfirmDeleteMaintenanceComponent, {disableClose:true, data:{
      maintenanceId: maintenanceId
    }});
  }
  showMaintenance(idMaintenance:number){
    const showMaintenanceDialog= this.dialog.open(ShowMaintenancesComponent, {
      disableClose: true,
      data: {
        Id: idMaintenance,
      },
    });
    showMaintenanceDialog.backdropClick();
  }
  selectedAreas($event){
    this.areasFiltered= $event.map(function(a){return a.id});
  }
  selectedEngineTypes($event){
    this.engineTypeFiltered= $event.map(function(a){return a.id});
  }

  filter(){
    let Filter={
      AreasId:this.areasFiltered,
      EngineTypeId :this.engineTypeFiltered,
      FromDate:this.datePipe.transform(this.filterForm.controls.fromDate.value, 'YYYY/MM/dd'),
      ToDate:this.datePipe.transform(this.filterForm.controls.toDate.value, 'YYYY/MM/dd')
    };
    this.planMaintenanceService.GetAllVehicleMaintenanceBySearch(Filter).subscribe(res=>{
      this.vehicleMaintenances= res.vehicleMaintenance;
      this.vehicleMaintenanceHeader= res.vehicleMaintenanceHeader;
    })
  }
  clearFilters(){
    this.areasMaster=null;
    this.engineTypeMaster=null;
    this.getAllSettingsToList();
    this.getAllVehicleMaintenance();
  }

  showPlanMaintenance(planMaintenanceId){
    const showPlanMaintenanceDialog= this.dialog.open(ShowPlanMaintenanceComponent, {
      disableClose: true,
      data: {
        Id: planMaintenanceId,
      },
    });
    showPlanMaintenanceDialog.backdropClick();
  }
}