import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditMaintenancesComponent } from '../edit-maintenances/edit-maintenances.component';
import { MaintenancesService } from '../shared/services/maintenances-service.service';

@Component({
  selector: 'cad-show-maintenances',
  templateUrl: './show-maintenances.component.html',
  styleUrls: ['./show-maintenances.component.scss'],
})
export class ShowMaintenancesComponent implements OnInit {
  typeMaintenance: any = '';
  sparePartsArray: any = [];
  activitiesPreventiveArray: any = [];
  activitiesCorrectiveArray: any = [];
  preventiveMaintenance: number;
  correctiveMaintenance: number;

  //Parameters
  planStateApprovedParameter: any;
  planStateExpireParameter: any;
  planStateRegisterdParameter: any;
  maintenanceStateExecutedParameter: any;
  maintenanceStateNotExecutedParameter: any;
  maintenanceStateRegisteredParameter: any;

  maintenance: any;
  constructor(
    public dialog: MatDialog,
    private _maintenanceService: MaintenancesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.getSettingsLists();
  }

  ngOnInit(): void {}

  getSettingsLists() {
    this._maintenanceService.getAllSettingsToList().subscribe(response => {
      this.preventiveMaintenance = response.data.preventiveMaintenance;
      this.correctiveMaintenance = response.data.correctiveMaintenance;
      this.getMaintenanceById();
    });
  }

  getMaintenanceById() {
    this._maintenanceService.getMaintenanceById(this.data.Id).subscribe(res => {
      this.maintenance = res.data;
      this.planStateExpireParameter = res.data.planStateExpireParameter;
      this.planStateRegisterdParameter = res.data.planStateRegisterdParameter;
      this.planStateApprovedParameter = res.data.planStateApprovedParameter;
      this.maintenanceStateExecutedParameter = res.data.maintenanceStateExecutedParameter;
      this.maintenanceStateNotExecutedParameter = res.data.maintenanceStateNotExecutedParameter;
      this.maintenanceStateRegisteredParameter = res.data.maintenanceStateRegisteredParameter;
      if (this.maintenance.state == this.maintenanceStateExecutedParameter) {
        this.maintenance.documentsConformityUrl = res.data.documentsConformityUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        });

        this.maintenance.documentsSparePartUrl = res.data.documentsSparePartUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        });

        this.maintenance.documentsVehicleUrl = res.data.documentsVehicleUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        });
      }
    });
  }

  openEdit() {
    const dialogRef = this.dialog.open(EditMaintenancesComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      this.getSettingsLists();
    });
  }

  openUnsuscribe() {}
}
