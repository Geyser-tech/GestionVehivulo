import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { JwtService } from '@cad-core/services';
import jwt_decode from 'jwt-decode';
import { EditMobilityRequestComponent } from '../edit-mobility-request/edit-mobility-request.component';
import { UnsuscribeMobilityRequestComponent } from '../unsuscribe-mobility-request/unsuscribe-mobility-request.component';
import { GetMobilityRequestByIdQuery } from '../shared/interfaces/get-mobility-request-by-id-query.interface';
import { MobilityRequestService } from '../shared/services/mobilityRequest-service.service';
import { SendDocumentWhatsappComponent } from 'projects/ui-components/src/lib/send-document-whatsapp/send-document-whatsapp.component';
@Component({
  selector: 'cad-show-mobility-request',
  templateUrl: './show-mobility-request.component.html',
  styleUrls: ['./show-mobility-request.component.scss'],
})
export class ShowMobilityRequestComponent implements OnInit {
  //Variables
  idMobilityRequest: number;
  mobilityRequest: GetMobilityRequestByIdQuery;
  checkOnlyRead: boolean = false;

  //Parameters
  UserOnlyRead: string;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mobilityRequestService: MobilityRequestService,
    private spinner: NgxSpinnerService,
    private jwtService: JwtService
  ) {
    this.idMobilityRequest = this.data.Id;
    this.mobilityRequestService.getMobilityRequestById(this.idMobilityRequest).subscribe(res => {
      this.spinner.show();
      this.mobilityRequest = {
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
    });
  }

  setCheckRole(): boolean {
    const token = this.jwtService.getToken();
    const decodedToken: any = jwt_decode(token);
    const userRoles = decodedToken.roles;
    if (userRoles.includes(this.UserOnlyRead)) {
      return true;
    } else return false;
  }

  ngOnInit(): void {}
  openEdit() {
    const editMobilityRequestModal = this.dialog.open(EditMobilityRequestComponent, {
      disableClose: true,
      data: {
        mobilityRequest: this.mobilityRequest,
      },
    });
    editMobilityRequestModal.backdropClick();
    editMobilityRequestModal.afterClosed().subscribe(result => {
      this.mobilityRequestService.getMobilityRequestById(this.idMobilityRequest).subscribe(res => {
        this.spinner.show();
        this.mobilityRequest = res.data;
        this.mobilityRequest.documentsUrl = res.data.documentsUrl.map(documentURL => {
          let separator = documentURL.indexOf(',');
          return (documentURL = {
            file: documentURL.substring(separator + 1, documentURL.length),
            fileName: documentURL.substring(0, separator),
          });
        });
        this.UserOnlyRead = res.data.userOnlyRead;
        this.checkOnlyRead = this.setCheckRole();
      });
    });
  }
  openUnsuscribe() {
    const unsuscribeMobilityRequestModal = this.dialog.open(UnsuscribeMobilityRequestComponent, {
      disableClose: true,
      width: '40%',
      data: {
        Id: this.idMobilityRequest,
      },
    });
    unsuscribeMobilityRequestModal.backdropClick();
    unsuscribeMobilityRequestModal.afterClosed().subscribe(result => {
      this.mobilityRequestService.getMobilityRequestById(this.idMobilityRequest).subscribe(res => {
        this.mobilityRequest = res.data;
      });
    });
  }

  SendDocument(): void {
    const dialogRef = this.dialog.open(SendDocumentWhatsappComponent, { disableClose: true });
    dialogRef.backdropClick();
  }
}
