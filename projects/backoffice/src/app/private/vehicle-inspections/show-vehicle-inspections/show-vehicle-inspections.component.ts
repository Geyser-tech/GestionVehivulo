import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EditVehicleInspectionsComponent } from '../edit-vehicle-inspections/edit-vehicle-inspections.component';
import { UnsuscribeVehicleInspectionsComponent } from '../unsuscribe-vehicle-inspections/unsuscribe-vehicle-inspections.component';
import { VehicleInspectionsService } from '../shared/services/vehicle-inspections-service.service';
import { GetVehicleInspectionByIdQuery } from '../shared/interfaces/get-vehicle-inspection-by-id-query.interface';
import { SendDocumentWhatsappComponent } from 'projects/ui-components/src/lib/send-document-whatsapp/send-document-whatsapp.component';
import { GetVehicleByIdQuery } from '@cad-private/vehicles/shared/interfaces/get-vehicle-by-id-query.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'cad-show-vehicle-inspections',
  templateUrl: './show-vehicle-inspections.component.html',
  styleUrls: ['./show-vehicle-inspections.component.scss'],
})
export class ShowVehicleInspectionsComponent implements OnInit {
  vehicleInspection: GetVehicleInspectionByIdQuery;

  STATE_EXPIRE: string = 'Por Caducar';
  idVehicleInspection: number;
  vehicle: GetVehicleByIdQuery;

  checkOnlyRead: boolean = false;

  //Parameters
  UserOnlyRead: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private vehicleInspectionsService: VehicleInspectionsService,
    private spinner: NgxSpinnerService,
    private jwtService: JwtService
  ) {}

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    console.log(userRoles);
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  ngOnInit(): void {
    this.readData();
  }

  readData() {
    this.idVehicleInspection = this.data.Id;
    this.vehicleInspectionsService.getVehicleInspectionById(this.idVehicleInspection).subscribe(res => {
      this.spinner.show();
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
      this.UserOnlyRead = res.data.userOnlyRead;
      this.checkOnlyRead = this.setCheckRole();

      if (this.vehicleInspection.stateVehicleInspection == 'PorVencer') {
        this.vehicleInspection.stateVehicleInspection = this.STATE_EXPIRE;
      }
    });
  }

  openUnsuscribe() {
    const unsuscribeVehicleModal = this.dialog.open(UnsuscribeVehicleInspectionsComponent, {
      disableClose: true,
      width: '40%',
      data: {
        Id: this.idVehicleInspection,
      },
    });
    unsuscribeVehicleModal.backdropClick();
    unsuscribeVehicleModal.afterClosed().subscribe(result => {
      this.vehicleInspectionsService.getVehicleInspectionById(this.idVehicleInspection).subscribe(res => {
        this.vehicle = {
          ...res.data,
          documentsUrl: res.data.documentsUrl.map(documentURL => {
            let separator = documentURL.indexOf(',');
            return (documentURL = {
              file: documentURL.substring(separator + 1, documentURL.length),
              fileName: documentURL.substring(0, separator),
            });
          }),
        };
      });
    });
  }

  openEdit() {
    const editModal = this.dialog.open(EditVehicleInspectionsComponent, {
      disableClose: true,
      data: {
        Id: this.data.Id,
      },
    });

    editModal.backdropClick();
    editModal.afterClosed().subscribe(result => {
      this.readData();
    });
  }

  SendDocument(): void {
    const dialogRef = this.dialog.open(SendDocumentWhatsappComponent, { disableClose: true });
    dialogRef.backdropClick();
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
